import React, { useContext } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './StickyCart.css';

const StickyCart = () => {
  const { cartItems, food_list, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const totalItems = Object.values(cartItems).reduce((acc, item) => acc + item, 0);
  const totalPrice = getTotalCartAmount();

  // Hide the cart if no items are added or if the current page is not the home page
  if (totalItems === 0 || location.pathname !== '/') return null;

  const handleCheckout = () => {
    navigate('/cart');
  };

  return (
    <div className="sticky-cart">
      <div className="sticky-cart-content">
        <div className="sticky-cart-details">
          <p>{totalItems} item{totalItems > 1 ? 's' : ''}</p>
          <p>₹{totalPrice}</p>
        </div>
        <button className="sticky-cart-button" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default StickyCart;
