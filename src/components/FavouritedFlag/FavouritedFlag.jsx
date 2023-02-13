import { HiOutlineHeart } from 'react-icons/hi';
import { HiHeart } from 'react-icons/hi';
import styles from './FavouritedFlag.module.scss';
import { updateFavourited } from '../../services/data';
import { CartContext } from '../../context/CartProvider';
import { useState, useContext } from 'react';

const FavouritedFlag = ({ productId, isAFavourite }) => {
  const [favourited, setFavourited] = useState(isAFavourite);
  const { favouritedUpdateCounter, setFavouritedUpdateCounter } =
    useContext(CartContext);

  const handleFavouriteClick = async (event) => {
    event.preventDefault();
    const src = event.target.className.baseVal;
    let favourite = false;
    if (src.indexOf('no') > -1) favourite = true;
    await updateFavourited(productId, favourite);
    setFavourited(favourite);

    const count = favouritedUpdateCounter + 1;
    setFavouritedUpdateCounter(count);
  };

  return (
    <div className={styles.FavouritedFlag}>
      <button type="button" onClick={handleFavouriteClick}>
        {favourited ? (
          <HiHeart className={styles.FavouritedFlag_yes} size={30} />
        ) : (
          <HiOutlineHeart className={styles.FavouritedFlag_no} size={30} />
        )}
      </button>
    </div>
  );
};

export default FavouritedFlag;
