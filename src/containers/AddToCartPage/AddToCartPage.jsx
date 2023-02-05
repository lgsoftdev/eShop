import styles from './AddToCartPage.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductById } from '../../services/data';
import { getInventoryByProductId } from '../../services/data';

const AddToCartPage = () => {
  const params = useParams();
  //console.log(params);

  const [product, setProduct] = useState(undefined);
  const [inventory, setInventory] = useState(undefined);

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
              {inventory.map((item) => {
                return (
                  <button
                    type="button"
                    className={styles.AddToCartPage__section_sizeBtn}
                    key={item.id}
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
              >
                ADD TO CART
              </button>
            </div>
            <div>Warning no more stock please choose from our designs.</div>
          </section>
        </section>
      )}
    </main>
  );
};

export default AddToCartPage;
