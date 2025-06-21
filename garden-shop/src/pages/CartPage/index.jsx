import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import styles from './CartPage.module.css';

export const CartPage = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        placeOrder,
        clearCart
    } = useCart();

    const [orderInfo, setOrderInfo] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [tempCartItems, setTempCartItems] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTempCartItems([...cartItems]);
        placeOrder();
        setShowSuccessModal(true);
    };

    const handleCloseModal = () => {
        clearCart();
        setShowSuccessModal(false);
    };

    const itemsToDisplay = showSuccessModal ? tempCartItems : cartItems;

    if (itemsToDisplay.length === 0 && !showSuccessModal) {
        return (
            <div className={styles.cartContainer}>
                <div className={styles.cartHeader}>
                    <h2 className={styles.title}>Shopping cart</h2>
                    <div className={styles.line}></div>
                    <Link to="/" className={styles.backLink}>Back to the store</Link>
                </div>

                <div className={styles.emptyCart}>
                    <p>Looks like you have no items in your basket currently.</p>
                    <Link to="/" className={styles.continueShopping}>Continue Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartContainer}>
            {showSuccessModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button
                            onClick={handleCloseModal}
                            className={styles.closeButton}
                        >
                            ×
                        </button>
                        <h3>Congratulations!</h3>
                        <p>Your order has been successfully placed on the website.</p>
                        <p>A manager will contact you shortly to confirm your order.</p>
                    </div>
                </div>
            )}

            <div className={styles.cartHeader}>
                <h2 className={styles.title}>Shopping cart</h2>
                <div className={styles.line}></div>
                <Link to="/" className={styles.backLink}>Back to the store</Link>
            </div>

            <div className={styles.FlexContainer}>
                <div className={styles.cartItems}>
                    {itemsToDisplay.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemInfo}>
                                <img
                                    src={`http://localhost:3333${item.image}`}
                                    alt={item.title}
                                    className={styles.itemImage}
                                />
                            </div>
                            <div className={styles.containerproducts}>
                                <div className={styles.containerproduct}>
                                    <h3 className={styles.itemTitle}>{item.title}</h3>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className={styles.removeButton}
                                        disabled={showSuccessModal}
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className={styles.itemControls}>
                                    <div className={styles.quantityControl}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1 || showSuccessModal}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={showSuccessModal}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className={styles.itemPrices}>
                                        <span className={styles.currentPrice}>
                                            ${((item.discont_price || item.price) * item.quantity).toFixed(2)}
                                        </span>
                                        {item.discont_price && (
                                            <span className={styles.originalPrice}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className={styles.orderForm}>
                    <div className={styles.formGroup}>
                        <h3>Order details</h3>
                        <span className={styles.count}>{totalItems} items</span>
                        <div className={styles.containerprice}>
                            <span className={styles.total}>Total</span>
                            <span className={styles.price}>${totalPrice.toFixed(2)}</span>
                        </div>
                        <input
                            type="text"
                            id="name"
                            placeholder='Name'
                            name="name"
                            value={orderInfo.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="tel"
                            placeholder='Phone number'
                            id="phone"
                            name="phone"
                            value={orderInfo.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            placeholder='Email'
                            id="email"
                            name="email"
                            value={orderInfo.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitOrder}>
                        Order
                    </button>
                </form>
            </div>
        </div>
    );
};