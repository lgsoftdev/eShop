import styles from './CarouselButtons.module.scss';
import circle_on from '../../assets/circle_on.png';
import circle_off from '../../assets/circle_off.png';
import back_arrow from '../../assets/back_arrow.png';
import forward_arrow from '../../assets/forward_arrow.png';
import { useHref } from 'react-router-dom';

const CarouselButtons = ({
  products,
  currentIndex,
  onArrowClick,
  onCircleClick,
}) => {
  const handleArrowClick = (event) => {
    event.preventDefault();
    onArrowClick(event.target.id);
  };

  return (
    <div className={styles.CarouselButtons}>
      <a onClick={handleArrowClick} href="#">
        <img id="back" src={back_arrow} />
      </a>
      {products.length > 0 &&
        products.map((item, index) => {
          return (
            <a key={index} id={products.id}>
              {currentIndex === index ? (
                <img src={circle_on} />
              ) : (
                <img src={circle_off} />
              )}
            </a>
          );
        })}
      <a onClick={handleArrowClick} href="#">
        <img id="forward" src={forward_arrow} />
      </a>
    </div>
  );
};

export default CarouselButtons;
