import faveYes from '../../assets/fave-yes.png';
import faveNo from '../../assets/fave-no.png';
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
    const src = event.target.src;
    let favourite = false;
    if (src.indexOf('no') > -1) favourite = true;
    await updateFavourited(productId, favourite);
    setFavourited(favourite);

    const count = favouritedUpdateCounter + 1;
    setFavouritedUpdateCounter(count);
  };

  return (
    <div className={styles.FavouritedFlag}>
      <a href="#" onClick={handleFavouriteClick}>
        <img src={favourited ? faveYes : faveNo} />
      </a>
    </div>
  );
};

export default FavouritedFlag;
