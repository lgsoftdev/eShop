import styles from './ShoppingCartPage.module.scss';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartProvider';
import ShoppingCartItem from '../../components/ShoppingCartItem/ShoppingCartItem';
import ShoppingCartTotal from '../../components/ShoppingCartTotal/ShoppingCartTotal';
import { batchQuantityUpdate } from '../../services/data';

const ShoppingCartPage = () => {
  const { cart } = useContext(CartContext);

  const handleCheckoutClick = (event) => {
    event.preventDefault();

    const updateData = async () => {
      await batchQuantityUpdate(cart);
    };

    try {
      updateData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className={styles.ShoppingCartPage}>
      <header>
        <div>Continue Shopping</div>
        <div className={styles.ShoppingCartPage__checkoutPanel}>
          <NavLink to="/checkout">
            <button
              type="button"
              className={styles.ShoppingCartPage_proceedToCheckout}
            >
              PROCEED TO CHECKOUT
            </button>
          </NavLink>

          <ShoppingCartTotal />
        </div>
      </header>
      <section>
        {cart.length > 0 &&
          cart.map((item, index1) => {
            return item.order.map((order, index2) => {
              return (
                <ShoppingCartItem
                  key={`${index1}_${index2}`}
                  productId={item.id}
                  productName={item.name}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  size={order.size}
                  quantity={order.quantity}
                />
              );
            });
          })}
      </section>
    </main>
  );
};

export default ShoppingCartPage;
