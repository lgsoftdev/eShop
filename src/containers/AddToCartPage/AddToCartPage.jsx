import styles from './AddToCartPage.module.scss';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect, useRef, createRef } from 'react';
import { CartContext } from '../../context/CartProvider';
import { getProductById } from '../../services/data';
import { getInventoryByProductId } from '../../services/data';

const AddToCartPage = () => {
  const params = useParams();
  const { cart, setCart } = useContext(CartContext);

  const [product, setProduct] = useState(undefined);
  const [inventory, setInventory] = useState(undefined);
  const sizeButtonsRef = useRef([]);
  const selectedSizeRef = useRef(undefined);
  const inventoryIdRef = useRef(undefined);
  const messageDivRef = useRef(undefined);

  const isStockAvailable = (size, qty) => {
    const data = inventory.filter((item) => item.size === Number(size));
    if (data[0].quantity > Number(qty)) {
      return true;
    }
    return false;
  };

  const handleSizeClick = (event) => {
    event.preventDefault();
    const targetId = event.target.id;
    messageDivRef.current.classList.add(styles.display_none);
    for (let i = 0; i < inventory.length; i++) {
      if (i === Number(targetId)) {
        selectedSizeRef.current = event.target.outerText;
        inventoryIdRef.current =
          sizeButtonsRef[i].current.getAttribute('data-key');
        sizeButtonsRef[i].current.classList.add(styles.button_green);
      } else {
        sizeButtonsRef[i].current.classList.remove(styles.button_green);
      }
    }
  };

  const handleAddToCartClick = (event) => {
    event.preventDefault();
    messageDivRef.current.classList.remove(styles.message_green);
    messageDivRef.current.classList.remove(styles.display_none);
    if (!selectedSizeRef.current) {
      messageDivRef.current.innerText = 'Please select a size.';
      messageDivRef.current.classList.add(styles.message_red);
    } else {
      let hasStock = true;
      let addNew = true;
      const cartCopy = [...cart];
      if (cartCopy.length > 0) {
        //Check if the same product already exists in the cart.
        const idInCart = cartCopy.findIndex((item) => item.id === params.id);
        if (idInCart >= 0) {
          addNew = false;
          //Check if the same size already exists in the cart.
          const sizeInCart = cartCopy[idInCart].order.findIndex(
            (item) => item.size === Number(selectedSizeRef.current)
          );
          if (sizeInCart >= 0) {
            //Add quantity of 1 to existing order for the same product and size.
            if (
              isStockAvailable(
                selectedSizeRef.current,
                cartCopy[idInCart].order[sizeInCart].quantity
              )
            ) {
              cartCopy[idInCart].order[sizeInCart].quantity += 1;
            } else {
              hasStock = false;
            }
          } else {
            //Add size and quantity to existing product in cart.
            const length = cartCopy[idInCart].order.length;
            cartCopy[idInCart].order[length] = {
              size: Number(selectedSizeRef.current),
              quantity: 1,
              inventoryId: inventoryIdRef.current,
            };
          }
        }
      }

      if (addNew) {
        cartCopy[cartCopy.length] = {
          id: params.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          order: [
            {
              size: Number(selectedSizeRef.current),
              quantity: 1,
              inventoryId: inventoryIdRef.current,
            },
          ],
        };
      }

      if (!hasStock) {
        messageDivRef.current.innerText = 'No more stock available.';
        messageDivRef.current.classList.add(styles.message_red);
      } else {
        setCart(cartCopy);

        messageDivRef.current.innerText = 'Item added to cart.';
        messageDivRef.current.classList.add(styles.message_green);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const product = await getProductById(params.id);
      const inventory = await getInventoryByProductId(params.id);
      setProduct(product);
      setInventory(inventory);
    };

    getData();
  }, []);

  return (
    <main className={styles.AddToCartPage}>
      {product && (
        <section className={styles.AddToCartPage__section}>
          <img src={product.imageUrl} />
          <section>
            <div className={styles.AddToCartPage__section_name}>
              {product.name}
            </div>
            <div
              className={styles.AddToCartPage__section_price}
            >{`$${product.price.toFixed(2)}`}</div>
            <div>Size:</div>
            <div>
              {inventory.map((item, index) => {
                sizeButtonsRef[index] = createRef();
                return item.quantity > 0 ? (
                  <button
                    key={item.id}
                    data-key={item.id}
                    id={index}
                    type="button"
                    className={styles.AddToCartPage__section_sizeBtn}
                    onClick={handleSizeClick}
                    ref={sizeButtonsRef[index]}
                  >
                    {item.size}
                  </button>
                ) : (
                  <button
                    key={item.id}
                    id={index}
                    type="button"
                    className={styles.AddToCartPage__section_sizeBtn}
                    disabled={true}
                    ref={sizeButtonsRef[index]}
                  >
                    {item.size}
                  </button>
                );
              })}
            </div>
            <div>
              <button
                type="button"
                className={styles.AddToCartPage__section_addToCartBtn}
                onClick={handleAddToCartClick}
              >
                ADD TO CART
              </button>
            </div>
            <div className={styles.display_none} ref={messageDivRef}>
              Please select a size.
            </div>
          </section>
        </section>
      )}
    </main>
  );
};

export default AddToCartPage;
