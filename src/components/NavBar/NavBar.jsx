import { NavLink } from 'react-router-dom';
import shopping_cart from '../../assets/shopping_cart.png';

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/shoppingCart">
        <img src={shopping_cart} />
      </NavLink>
    </nav>
  );
};

export default NavBar;
