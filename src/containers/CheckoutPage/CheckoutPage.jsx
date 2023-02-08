import { useContext, useEffect, useRef } from 'react';
import { CartContext } from '../../context/CartProvider';
import { batchQuantityUpdate } from '../../services/data';
import styles from './CheckoutPage.module.scss';

const CheckoutPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const msgRef = useRef('');

  useEffect(() => {
    const updateData = async () => {
      try {
        await batchQuantityUpdate(cart);
        setCart([]);
        msgRef.current.innerText = 'Your order has been placed.';
      } catch (e) {
        msgRef.current.innerText = e;
      }
    };

    updateData();
  }, []);

  return (
    <div className={styles.CheckoutPage}>
      <h1 ref={msgRef}></h1>
    </div>
  );
};

export default CheckoutPage;
