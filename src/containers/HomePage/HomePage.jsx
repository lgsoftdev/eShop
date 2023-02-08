import thebeach from '../../assets/thebeach.jpg';
import styles from './HomePage.module.scss';
import PopularProducts from '../../components/PopularProducts/PopularProducts';
import ProductsList from '../../components/ProductsList/ProductsList';
import { useState, useEffect, useRef, useContext } from 'react';
import { getAllProducts } from '../../services/data';
import { CartContext } from '../../context/CartProvider';

const HomePage = () => {
  const { favesUpdateCounter } = useContext(CartContext);
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
      {favourited.length > 0 && <PopularProducts products={favourited} />}
      <section ref={listRef}>
        <ProductsList products={allProducts} />
      </section>
    </main>
  );
};

export default HomePage;
