import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOpen(false);
  };

  const styles = {
    hamburger: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '30px',
      height: '24px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0',
      boxSizing: 'border-box',
    },
    line: {
      width: '100%',
      height: '3px',
      background: '#333',
      borderRadius: '3px',
      transition: 'all 0.3s linear',
    },
    menu: {
      position: 'absolute',
      top: '100%',
      right: '0',
      background: 'white',
      padding: '1rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      borderRadius: '5px',
      marginTop: '10px',
      display: isOpen ? 'block' : 'none',
      minWidth: '150px',
    },
    menuItem: {
      display: 'block',
      padding: '0.5rem',
      color: '#333',
      textDecoration: 'none',
      textAlign: 'center',
      width: '100%',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  return (
    <div>
      <button 
        onClick={toggleMenu} 
        style={styles.hamburger}
        aria-label="Menu"
      >
        <div style={styles.line}></div>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
      </button>
      <div style={styles.menu}>
        {!isLoggedIn ? (
          <Link to="/login" style={styles.menuItem}>
            Admin Login
          </Link>
        ) : (
          <button onClick={handleLogout} style={styles.menuItem}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;