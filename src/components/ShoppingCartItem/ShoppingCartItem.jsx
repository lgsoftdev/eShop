import styles from './ShoppingCartItem.module.scss';
import remove from '../../assets/remove.png';
import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider';

const ShoppingCartItem = ({
  productId,
  productName,
  imageUrl,
  price,
  size,
  quantity,
}) => {
  const { cart, setCart, total, setTotal } = useContext(CartContext);

  const handleRemoveClick = () => {
    //Remove item from cart.
    const newCart = [...cart];
    let minusAmount = 0;
    cart.forEach((product, prodIndex) => {
      if (product.id === productId) {
        product.order.forEach((item, itemIndex) => {
          if (Number(item.size) === Number(size)) {
            minusAmount = Number(item.quantity) * Number(product.price);
            product.order.splice(itemIndex, itemIndex + 1);
          }
        });
        if (product.order.length === 0) cart.splice(prodIndex, prodIndex + 1);
      }
    });

    setCart(newCart);

    const newTotal = total - minusAmount;
    setTotal(newTotal);
  };

  const handleQuantityChange = () => {};

  return (
    <main className={styles.ShoppingCartItem}>
      <div className={styles.ShoppingCartItem_remove}>
        <a id={productId} href="#" onClick={handleRemoveClick}>
          <img src={remove} />
        </a>
      </div>
      <section className={styles.ShoppingCartItem__productDetails}>
        <img className={styles.ShoppingCartItem_productImage} src={imageUrl} />
        <div>
          <label>{productName}</label>
          <div>Size: {size}</div>
          <div className={styles.ShoppingCartItem__qtyPanel}>
            <label>Qty</label>
            <div>
              <button type="button">-</button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button type="button">+</button>
            </div>
          </div>
          <label>{`$${(price * quantity).toFixed(2)}`}</label>
        </div>
      </section>
    </main>
  );
};

export default ShoppingCartItem;
