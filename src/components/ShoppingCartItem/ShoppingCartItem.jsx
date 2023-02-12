import styles from './ShoppingCartItem.module.scss';
import remove from '../../assets/remove.png';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartProvider';
import { getInventoryByProductIdAndSize } from '../../services/data';

const ShoppingCartItem = ({
  productId,
  productName,
  imageUrl,
  price,
  size,
  quantity,
}) => {
  const { cart, setCart } = useContext(CartContext);
  const [input, setInput] = useState(quantity);
  const [warning, setWarning] = useState('');

  const handleRemoveClick = () => {
    //Remove item from cart.
    const newCart = [...cart];
    newCart.forEach((product, prodIndex) => {
      if (product.id === productId) {
        product.order.forEach((item, itemIndex) => {
          if (Number(item.size) === Number(size)) {
            product.order.splice(itemIndex, itemIndex + 1);
          }
        });
        if (product.order.length === 0)
          newCart.splice(prodIndex, prodIndex + 1);
      }
    });

    setCart(newCart);
  };

  const handleQuantityChange = (event) => {
    let value = Number(event.target.value);
    if (value <= 0) value = 1;
    const getData = async () => {
      const inventory = await getInventoryByProductIdAndSize(productId, size);
      if (value > inventory.quantity) {
        value = inventory.quantity;
        setWarning(`Only ${value} left in stock.`);
      } else {
        setWarning('');
      }

      //Note: useState needed to be able to change text in input field.
      setInput(value);

      updateOrderQuantity(value);
    };

    getData();
  };

  const updateOrderQuantity = (newQuantity) => {
    //Update quantity in cart.
    const newCart = [...cart];
    newCart.forEach((product) => {
      if (product.id === productId) {
        product.order.forEach((item) => {
          if (Number(item.size) === Number(size)) {
            item.quantity = newQuantity;
          }
        });
      }
    });

    setCart(newCart);
  };

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
              <input
                type="number"
                value={input}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
          <label>{`$${(price * quantity).toFixed(2)}`}</label>
          <div className={styles.ShoppingCartItem__warning}>{warning}</div>
        </div>
      </section>
    </main>
  );
};

export default ShoppingCartItem;
