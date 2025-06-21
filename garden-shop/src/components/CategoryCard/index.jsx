import styles from './CategoryCard.module.css';
import { Link } from 'react-router-dom';

export const CategoryCard = ({ category }) => {
  const urlTitle = category.title.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={styles.card}>
      <Link to={`/categories/${urlTitle}`} className={styles.name}>
        <img src={category.img} alt={category.title} className={styles.image} />
        <h3 className={styles.name}>{category.title}</h3>
      </Link>
    </div>
  );
};
