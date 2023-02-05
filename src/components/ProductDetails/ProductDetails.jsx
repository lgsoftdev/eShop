import styles from './ProductDetails.module.scss';
import { NavLink } from 'react-router-dom';

const ProductDetails = ({ details, direction = '' }) => {
  const moveStyle =
    direction === ''
      ? direction
      : direction === 'forward'
      ? styles.ProductDetails__moveForward
      : styles.ProductDetails__moveBack;
  return (
    <div className={`${styles.ProductDetails} ${moveStyle}`}>
      <div>
        <NavLink to={`/addToCart/${details.id}`}>
          <img src={details.imageUrl} />
        </NavLink>
      </div>
      <div>{details.favourited}</div>
      <div className={styles.ProductDetails__name}>{details.name}</div>
      <div>{`$${details.price.toFixed(2)}`}</div>
    </div>
  );
};

export default ProductDetails;
