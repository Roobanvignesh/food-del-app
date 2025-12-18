import { faEnvelope, faHome, faMobileAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <li>
          <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </li>
        <li>
          <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>
            <FontAwesomeIcon icon={faUtensils} /> Menu
          </a>
        </li>
        <li>
          <a href='#app-download' onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>
            <FontAwesomeIcon icon={faMobileAlt} /> Mobile App
          </a>
        </li>
        <li>
          <a href='#footer' onClick={() => setMenu("Contact-us")} className={menu === "Contact-us" ? "active" : ""}>
            <FontAwesomeIcon icon={faEnvelope} /> Contact Us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
            {getTotalCartAmount() !== 0 && <div className="dot"></div>}
          </Link>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>{navigate('/myorders')}}><img src={assets.bag_icon} alt="" /> Orders</li>
              <hr />
              <li onClick={logOut}><img src={assets.logout_icon} alt="" /> Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
