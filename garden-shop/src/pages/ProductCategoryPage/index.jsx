import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProductCategoryPage.module.css';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';

export const ProductCategoryPage = () => {
  const { title } = useParams();
  const normalizedTitle = title.replace(/-/g, ' ');
  const [products, setProducts] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get('http://localhost:3333/categories/all'),
          axios.get('http://localhost:3333/products/all'),
        ]);

        const categories = catRes.data;
        const category = categories.find(c => c.title.toLowerCase() === normalizedTitle.toLowerCase());

        if (category) {
          const filtered = prodRes.data.filter(p => p.categoryId === category.id);
          setProducts(filtered);
        }

        setCategories(categories);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchData();
  }, [title]);

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    if (onlyDiscount) {
      filtered = filtered.filter(p => p.discont_price && p.discont_price < p.price);
    }

    if (priceFrom !== '') {
      filtered = filtered.filter(p => p.price >= Number(priceFrom));
    }

    if (priceTo !== '') {
      filtered = filtered.filter(p => p.price <= Number(priceTo));
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  return (
    <div>
      <section className={styles.discountProducts}>
        <div className={styles.containerdis}>
          <h2 className={styles.title}>{normalizedTitle}</h2>
        </div>
        <div className={styles.filters}>
          <label>
            Price
            <input
              type="number"
              value={priceFrom}
              onChange={e => setPriceFrom(e.target.value)}
              placeholder="from"
            />
            <input
              type="number"
              value={priceTo}
              onChange={e => setPriceTo(e.target.value)}
              placeholder="to"
            />
          </label>
          <label>
            Discounted items
            <input
              type="checkbox"
              checked={onlyDiscount}
              onChange={e => setOnlyDiscount(e.target.checked)}
            />
          </label>
          <label>
            Sorted
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">by default</option>
              <option value="newest">newest</option>
              <option value="price-high-low">price: High-Low</option>
              <option value="price-low-high">price: Low-High</option>
            </select>
          </label>
        </div>
        <div className={styles.container}>
          <div className={styles.productsGrid}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
