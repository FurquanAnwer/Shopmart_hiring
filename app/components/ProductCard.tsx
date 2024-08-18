import { useState } from 'react';
import styles from './ProductCard.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.round(rating) ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image
    }));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000); // Hide after 2 seconds
  };

  return (
    <>
      <div className={styles.card} onClick={toggleExpand}>
        <img src={product.image} alt={product.title} className={styles.thumbnailImage} />
        <h3 className={styles.productTitle}>{product.title}</h3>
        <div className={styles.productPriceRating}>
          <p className={styles.productPrice}>${product.price}</p>
          <div className={styles.productRating}>{renderStars(product.rating.rate)}</div>
        </div>
        <button onClick={handleAddToCart} className={styles.addToCartButton}>Add to Cart</button>
      </div>

      {showNotification && (
        <div className={styles.notification}>
          Item added to cart!
        </div>
      )}

      {isExpanded && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={toggleExpand}></button>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.productPriceRating}>
              <p className={styles.productPrice}>Price: ${product.price}</p>
              <div className={styles.productRating}>{renderStars(product.rating.rate)}</div>
            </div>
            <button onClick={handleAddToCart} className={styles.addToCartButton}>Add to Cart</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
