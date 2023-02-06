import styles from './App.module.scss';
import HeaderLinks from './components/HeaderLinks/HeaderLinks';
import HomePage from './containers/HomePage/HomePage';
import AddToCartPage from './containers/AddToCartPage/AddToCartPage';
import ShoppingCartPage from './containers/ShoppingCartPage/ShoppingCartPage';
import CartProvider from './context/CartProvider';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <CartProvider>
        <BrowserRouter>
          <HeaderLinks />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addToCart/:id" element={<AddToCartPage />} />
            <Route path="/shoppingCart" element={<ShoppingCartPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
