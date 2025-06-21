import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AllProductsPage.module.css';
import { ProductCard } from '../../components/ProductCard';

export const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    axios.get('http://localhost:3333/products/all')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error('Ошибка загрузки продуктов:', err));
  }, []);

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    if (onlyDiscount) {
      filtered = filtered.filter(p =>
        p.discont_price !== null && p.discont_price < p.price
      );
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
          <h2 className={styles.title}>All products</h2>
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
