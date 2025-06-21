import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import notfound from '../../assets/404.jpg'

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <img src={notfound} alt="notfound" className={styles.img} />
      <p className={styles.title} >Page Not Found</p>
      <p className={styles.text} >We’re sorry, the page you requested could not be found. <br /> Please go back to the homepage.</p>
      <Link to="/" className={styles.link}>Go Home</Link>
    </div>
  );
};