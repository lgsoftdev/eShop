import styles from './ShoppingCartTotal.module.scss';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartProvider';

const ShoppingCartTotal = () => {
  const { cart, total, setTotal } = useContext(CartContext);

  useEffect(() => {
    if (cart.length > 0) {
      const amounts = [];
      for (let i = 0; i < cart.length; i++) {
        const order = cart[i].order;
        for (let j = 0; j < order.length; j++) {
          amounts.push(Number(cart[i].price) * Number(order[j].quantity));
        }
      }

      const cartTotal = amounts.reduce((acc, amount) => {
        acc = acc + amount;
        return acc;
      }, 0);

      setTotal(cartTotal);
    } else {
      setTotal(0);
    }
  }, [cart]);

  return (
    <div className={styles.ShoppingCartTotal}>
      <h2>My Cart</h2>
      <h4>Total: {`$${total.toFixed(2)}`}</h4>
    </div>
  );
};

export default ShoppingCartTotal;
