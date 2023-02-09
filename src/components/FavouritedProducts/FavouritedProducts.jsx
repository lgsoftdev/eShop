import styles from './FavouritedProducts.module.scss';
import ProductDetails from '../ProductDetails/ProductDetails';
import CarouselButtons from '../CarouselButtons/CarouselButtons';
import { useState } from 'react';

const FavouritedProducts = ({ products, onFavouriteClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState('');

  const handleArrowClick = (direction) => {
    if (direction === 'forward' && Number(currentIndex) < products.length - 1) {
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

  const handleFavouriteClick = (productId, favourite) => {
    onFavouriteClick(productId, favourite);
  };

  return (
    <section className={styles.FavouritedProducts}>
      <header className={styles.FavouritedProducts__header}>
        <div>GET</div>
        <div>READY</div>
        <div>FOR</div>
        <div>SUMMER</div>
        <div>2024!</div>
      </header>
      <section className={styles.FavouritedProducts__productdetails}>
        {products.length > 0 && (
          <ProductDetails
            key={products[currentIndex].id}
            details={products[currentIndex]}
            direction={imageDirection}
            onFavouriteClick={handleFavouriteClick}
          />
        )}
        <CarouselButtons
          products={products}
          currentIndex={currentIndex}
          onArrowClick={handleArrowClick}
          onCircleClick={handleCircleClick}
        />
      </section>
    </section>
  );
};

export default FavouritedProducts;
