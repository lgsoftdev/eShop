import styles from './ProductDetails.module.scss';
import { NavLink } from 'react-router-dom';
import faveYes from '../../assets/fave-yes.png';
import faveNo from '../../assets/fave-no.png';
import { updateFavourited } from '../../services/data';
import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider';

const ProductDetails = ({ details, direction = '' }) => {
  const { favesUpdateCounter, setFavesUpdateCounter } = useContext(CartContext);

  const moveStyle =
    direction === ''
      ? direction
      : direction === 'forward'
      ? styles.ProductDetails__moveForward
      : styles.ProductDetails__moveBack;

  const handleFavouriteClick = async (event) => {
    event.preventDefault();
    const src = event.target.src;
    let favourite = false;
    if (src.indexOf('no') > -1) favourite = true;
    await updateFavourited(details.id, favourite);
    const count = favesUpdateCounter + 1;
    setFavesUpdateCounter(count);
  };

  return (
    <div className={`${styles.ProductDetails} ${moveStyle}`}>
      <div>
        <NavLink to={`/addToCart/${details.id}`}>
          <img
            src={details.imageUrl}
            className={styles.ProductDetails_imgProd}
          />
        </NavLink>
      </div>
      <div className={styles.ProductDetails__namePricePanel}>
        <div>
          <div className={styles.ProductDetails__name}>{details.name}</div>
          <div>{`$${details.price.toFixed(2)}`}</div>
        </div>
        <div>
          <a href="#" onClick={handleFavouriteClick}>
            <img
              src={details.favourited ? faveYes : faveNo}
              className={styles.ProductDetails_imgFave}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
