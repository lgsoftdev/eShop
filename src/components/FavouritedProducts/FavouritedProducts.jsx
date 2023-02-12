import styles from './FavouritedProducts.module.scss';
import ProductDetails from '../ProductDetails/ProductDetails';
import CarouselButtons from '../CarouselButtons/CarouselButtons';
import { getFavouritedProducts } from '../../services/data';
import { CartContext } from '../../context/CartProvider';
import { useEffect, useState, useContext } from 'react';

const FavouritedProducts = ({ products }) => {
  const { favouritedUpdateCounter } = useContext(CartContext);
  const [favouritedProducts, setFavouritedProducts] = useState(products);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState('');

  const handleArrowClick = (direction) => {
    if (
      direction === 'forward' &&
      Number(currentIndex) < favouritedProducts.length - 1
    ) {
      setImageDirection(direction);
      setCurrentIndex(Number(currentIndex) + 1);
    } else if (direction === 'back' && Number(currentIndex) > 0) {
      setImageDirection(direction);
      setCurrentIndex(Number(currentIndex) - 1);
    }
  };

  const handleCircleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const getData = async () => {
      const products = await getFavouritedProducts();
      setFavouritedProducts(products);
    };

    if (favouritedUpdateCounter > 0) getData();
  }, [favouritedUpdateCounter]);

  return (
    favouritedProducts.length > 0 && (
      <section className={styles.FavouritedProducts}>
        <header className={styles.FavouritedProducts__header}>
          <div>GET</div>
          <div>READY</div>
          <div>FOR</div>
          <div>SUMMER</div>
          <div>2024!</div>
        </header>
        <section className={styles.FavouritedProducts__productdetails}>
          <ProductDetails
            key={favouritedProducts[currentIndex].id}
            details={favouritedProducts[currentIndex]}
            direction={imageDirection}
          />
          <CarouselButtons
            products={favouritedProducts}
            currentIndex={currentIndex}
            onArrowClick={handleArrowClick}
            onCircleClick={handleCircleClick}
          />
        </section>
      </section>
    )
  );
};

export default FavouritedProducts;
