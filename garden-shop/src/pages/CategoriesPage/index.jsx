import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CategoriesPage.module.css';
import { CategoryCard } from '../../components/CategoryCard';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const baseURL = "http://localhost:3333";

  useEffect(() => {
    axios.get("http://localhost:3333/categories/all")
      .then(res => {
        const fixedData = res.data.map(category => ({
          ...category,
          img: baseURL + category.image
        }));
        setCategories(fixedData);
      })
      .catch(() => {
        console.error("Ошибка загрузки категорий");
      });
  }, []);

  return (
    <div>
      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.title}>Categories</h2>
        </div>

        <div className={styles.cardsContainer}>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </section>
    </div>
  );
};