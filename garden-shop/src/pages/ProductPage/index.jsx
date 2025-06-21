import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../store/CartContext';
import styles from './ProductPage.module.css';

export const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3333/products/${id}`);
                setProduct(response.data[0]);
                setLoading(false);
            } catch (err) {
                setError('Error loading product');
                setLoading(false);
                console.error('Error fetching product:', err);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!product) return <div className={styles.notFound}>Product not found</div>;

    return (
        <div className={styles.productPage}>
            <div className={styles.productContainer}>
                <div className={styles.imageContainer}>
                    <img
                        src={`http://localhost:3333${product.image}`}
                        alt={product.title}
                        className={styles.productImage}
                    />
                </div>

                <div className={styles.productDetails}>
                    <h1 className={styles.productTitle}>{product.title}</h1>

                    <div className={styles.priceContainer}>
                        {product.discont_price ? (
                            <>
                                <span className={styles.discountedPrice}>${product.discont_price}</span>
                                <span className={styles.originalPrice}>${product.price}</span>
                                <span className={styles.discountPercentage}>
                                    {Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                                </span>
                            </>
                        ) : (
                            <span className={styles.regularPrice}>${product.price}</span>
                        )}
                    </div>
                    <div className={styles.FlexContainer}>
                        <div className={styles.quantityContainer}>
                            <button
                                className={styles.quantityBtn}
                                onClick={decrementQuantity}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <input
                                id='quantity'
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className={styles.quantityInput}
                            />
                            <button
                                className={styles.quantityBtn}
                                onClick={incrementQuantity}
                            >
                                +
                            </button>
                        </div>

                        <button
                            className={styles.addToCartBtn}
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>
                    </div>

                    <div className={styles.description}>
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};