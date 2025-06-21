import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../store/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const discountPercent = product.discont_price
    ? Math.round(((product.price - product.discont_price) / product.price) * 100)
    : 0;

  return (
    <Link to={`/products/${product.id}`} className={styles.name}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
            className={styles.image}
          />
          {discountPercent > 0 && (
            <div className={styles.discountBadge}>-{discountPercent}%</div>
          )}
          <button
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Add to cart
          </button>
        </div>
        <h3 className={styles.name}>{product.title}</h3>
        <div className={styles.priceBlock}>
          <span className={styles.price}>
            ${product.discont_price ?? product.price}
          </span>
          {product.discont_price && (
            <span className={styles.oldPrice}>${product.price}</span>
          )}
        </div>
      </div>
    </Link>
  );
};