import thebeach from '../../assets/thebeach.jpg';
import styles from './HomePage.module.scss';
import FavouritedProducts from '../../components/FavouritedProducts/FavouritedProducts';
import ProductsList from '../../components/ProductsList/ProductsList';
import { useState, useEffect, useRef } from 'react';
import { getAllProducts, updateFavourited } from '../../services/data';

const HomePage = () => {
  const [favesUpdateCounter, setFavesUpdateCounter] = useState(0);
  const [allProducts, setAllProducts] = useState(undefined);
  const favourited = allProducts
    ? allProducts.filter((item) => item.favourited)
    : [];
  const listRef = useRef(undefined);

  const handleShopNow = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: listRef.current.offsetHeight - 50,
      behaviour: 'smooth',
    });
  };

  const handleFavouriteClick = async (productId, favourite) => {
    await updateFavourited(productId, favourite);
    const count = favesUpdateCounter + 1;
    //Set to cause re-render.
    setFavesUpdateCounter(count);
  };

  useEffect(() => {
    const getData = async () => {
      const products = await getAllProducts();
      setAllProducts(products);
    };

    getData();
  }, [favesUpdateCounter]);

  return (
    <main className={styles.HomePage}>
      <section className={styles.HomePage__section_top}>
        <button type="button" onClick={handleShopNow}>
          SHOP NOW
        </button>
        <img src={thebeach} alt="flip-flops on the beach" />
      </section>
      {favourited.length > 0 && (
        <FavouritedProducts
          products={favourited}
          onFavouriteClick={handleFavouriteClick}
        />
      )}
      <section ref={listRef}>
        <ProductsList
          products={allProducts}
          onFavouriteClick={handleFavouriteClick}
        />
      </section>
    </main>
  );
};

export default HomePage;
