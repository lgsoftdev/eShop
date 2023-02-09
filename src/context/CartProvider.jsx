import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [favesUpdateCounter, setFavesUpdateCounter] = useState(0);
  const data = {
    cart,
    setCart,
    total,
    setTotal,
    favesUpdateCounter,
    setFavesUpdateCounter,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartProvider;
