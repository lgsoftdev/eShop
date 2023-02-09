import styles from './PopularProducts.module.scss';
import ProductDetails from '../ProductDetails/ProductDetails';
import CarouselButtons from '../CarouselButtons/CarouselButtons';
import { useEffect, useState } from 'react';

const PopularProducts = ({ products }) => {
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

  return (
    <section className={styles.PopularProducts}>
      <header className={styles.PopularProducts__header}>
        <div>BE</div>
        <div>READY</div>
        <div>FOR</div>
        <div>SUMMER</div>
        <div>2023!</div>
      </header>
      <section className={styles.PopularProducts__productdetails}>
        {products.length > 0 && (
          <ProductDetails
            key={products[currentIndex].id}
            details={products[currentIndex]}
            direction={imageDirection}
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

export default PopularProducts;
