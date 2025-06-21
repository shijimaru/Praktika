import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './HomePage.module.css';
import { CategoryCard } from '../../components/CategoryCard';
import { ProductCard } from '../../components/ProductCard';
import formimage from '../../assets/form-img.png';

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [topDiscountProducts, setTopDiscountProducts] = useState([]);
  const baseURL = "http://localhost:3333";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3333/sale/send', formData);
      console.log('Ответ от сервера:', response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Ошибка отправки:', error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3333/categories/all")
      .then(res => {
        const fixedData = res.data.map(category => ({
          ...category,
          img: baseURL + category.image
        }));
        setCategories(fixedData.slice(0, 4));
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка загрузки категорий");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3333/products/all')
      .then(res => {
        const sorted = res.data
          .filter(p => p.price && p.discont_price)
          .sort((a, b) => ((a.price - a.discont_price) / a.price) < ((b.price - b.discont_price) / b.price) ? 1 : -1)
          .slice(0, 4);
        setTopDiscountProducts(sorted);
      })
      .catch(err => console.error('Ошибка загрузки продуктов:', err));
  }, []);

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h2 className={styles.text}>Amazing Discounts <br /> on Garden Products!</h2>
          <a href="#" className={styles.btn}>Check out</a>
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.title}>Categories</h2>
          <div className={styles.line}></div>
          <Link to="/categories" className={styles.link}>All categories</Link>
        </div>

        <div className={styles.cardsContainer}>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

        <div className={styles.formcontainer}>
          <h2 className={styles.formtitle}>5% off on the first order</h2>
          <div className={styles.containercontentform}>
            <img src={formimage} alt="image" className={styles.formimage} />
            <form className={styles.formbox} onSubmit={handleSubmit}>
              <input name='name' type="text" placeholder="Name" className={styles.forminput} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <input name='phone' type="text" placeholder="Phone number" className={styles.forminput} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
              <input name='email' type="email" placeholder="Email" className={styles.forminput} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              <button type="submit" className={`${styles.submitBtn} ${submitted ? styles.successBtn : ''}`} disabled={submitted}>
                {submitted ? 'Request submitted' : 'Get a discount'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className={styles.discountProducts}>
        <div className={styles.containerdis}>
          <h2 className={styles.title}>Sale</h2>
          <div className={styles.linedis}></div>
          <Link to="/sales" className={styles.linkdis}>All sales</Link>
        </div>
        <div className={styles.productsGrid}>
          {topDiscountProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
