import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "./navbar.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}cat/all`, { 
          withCredentials: true 
        });
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    
    // Cleanup function
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header id="back-to-top-anchor">
        <nav className="mainnav">
          {/* Logo/Brand area - you can add logo here */}
          <div className="brand">
            <NavLink to="/" className="brand-link">
              <h3>Your Blog</h3>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <ul className="menuUl desktop-menu">
            <li className="mainMenuList">
              <NavLink className="link" to="/">
                <h6>Home</h6>
              </NavLink>
            </li>
            {categories && categories.map((cat) => (
              <li className="mainMenuList" key={cat.name}>
                <NavLink
                  className="link"
                  to={`/?cat=${cat.name}`}
                >
                  <h6>{cat.name}</h6>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Action Area */}
          <div className="actionArea desktop-action">
            {currentUser ? (
              <div className="user-info">
                <span className="user-greeting">Hi {currentUser?.username}</span>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <NavLink className="login-btn" to="/login">
                Login
              </NavLink>
            )}
            <NavLink className="write-btn" to="/write">
              Write
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-menuUl">
            <li className="mobile-menuItem">
              <NavLink 
                className="mobile-link" 
                to="/" 
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            {categories && categories.map((cat) => (
              <li className="mobile-menuItem" key={cat.name}>
                <NavLink
                  className="mobile-link"
                  to={`/?cat=${cat.name}`}
                  onClick={closeMobileMenu}
                >
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Action Area */}
          <div className="mobile-actions">
            {currentUser ? (
              <div className="mobile-user-info">
                <span className="mobile-user-greeting">Hi {currentUser?.username}</span>
                <button 
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }} 
                  className="mobile-logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink 
                className="mobile-login-btn" 
                to="/login"
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>
            )}
            <NavLink 
              className="mobile-write-btn" 
              to="/write"
              onClick={closeMobileMenu}
            >
              Write
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;