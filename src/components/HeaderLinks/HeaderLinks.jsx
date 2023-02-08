import styles from './HeaderLinks.module.scss';
import shopping_cart from '../../assets/shopping_cart.png';
import { NavLink } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartProvider';

const HeaderLinks = () => {
  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let quantity = 0;
    if (cart.length > 0) {
      quantity = cart.reduce((acc, product) => {
        let qtyPerProduct = 0;
        product.order.forEach((item) => (qtyPerProduct += item.quantity));
        return acc + qtyPerProduct;
      }, 0);
    }
    setCount(quantity);
  }, [cart]);

  return (
    <header className={styles.HeaderLinks}>
      <NavLink to="/">
        <div>flip-flops</div>
      </NavLink>
      <NavLink to="/shoppingCart">
        <img src={shopping_cart} />
        {count > 0 && <label>{count}</label>}
      </NavLink>
    </header>
  );
};

export default HeaderLinks;
