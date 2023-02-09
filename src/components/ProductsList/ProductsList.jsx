import ProductDetails from '../ProductDetails/ProductDetails';
import styles from './ProductsList.module.scss';

const ProductsList = ({ products, onFavouriteClick }) => {
  const handleFavouriteClick = (productId, favourite) => {
    onFavouriteClick(productId, favourite);
  };

  return (
    <section className={styles.ProductsList}>
      {products &&
        products.map((item) => (
          <ProductDetails
            key={item.id}
            details={item}
            onFavouriteClick={handleFavouriteClick}
          />
        ))}
    </section>
  );
};

export default ProductsList;
