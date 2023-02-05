import styles from './App.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './containers/HomePage/HomePage';
import AddToCartPage from './containers/AddToCartPage/AddToCartPage';
import ShoppingCartPage from './containers/ShoppingCartPage/ShoppingCartPage';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <header className={styles.App__header}>
          <h1>flip-flops</h1>
          <NavBar />
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addToCart/:id" element={<AddToCartPage />} />
          <Route path="/shoppingCart" element={<ShoppingCartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
