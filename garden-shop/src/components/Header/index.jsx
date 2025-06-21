import { Link } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import styles from './Header.module.css';
import logo from '../../assets/logo.jpg';
import icon from '../../assets/icon.jpg';

export const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Main Page</Link>
        <Link to="/categories" className={styles.link}>Categories</Link>
        <Link to="/products" className={styles.link}>All products</Link>
        <Link to="/sales" className={styles.link}>All sales</Link>
      </nav>

      <div className={styles.cartContainer}>
        <Link to="/cart" className={styles.cartLink}>
          <img src={icon} alt="Cart" className={styles.cart} />
          {totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}
        </Link>
      </div>
    </header>
  );
};