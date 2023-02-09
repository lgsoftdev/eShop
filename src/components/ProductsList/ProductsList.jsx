import ProductDetails from '../ProductDetails/ProductDetails';
import styles from './ProductsList.module.scss';

const ProductsList = ({ products }) => {
  return (
    <section className={styles.ProductsList}>
      {products &&
        products.map((item) => <ProductDetails key={item.id} details={item} />)}
    </section>
  );
};

export default ProductsList;
