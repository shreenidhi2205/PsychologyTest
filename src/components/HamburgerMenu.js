import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Track visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOpen(false);
  };

  const handleAdminLoginClick = () => {
    setIsOpen(false); // Close the menu after clicking Admin Login
  };

  // Hide/show menu based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }

      setLastScrollY(currentScrollY); // Update last scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const styles = {
    container: {
      position: 'fixed',
      top: '0',
      right: '0',
      zIndex: '1000',
      padding: '10px',
      transition: 'transform 0.3s ease-in-out',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)', // Slide in/out
    },
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
    <div style={styles.container}>
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
          <Link 
            to="/login" 
            style={styles.menuItem} 
            onClick={handleAdminLoginClick}
          >
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
