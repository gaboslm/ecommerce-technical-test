import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(response => response.json())
      .then(data => {
        const validCategories = data
        .slice(0, 4);
        setCategories(validCategories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-microchip"></i>
          <span>TechStore</span>
        </Link>
        
        <div className="navbar-nav desktop-nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              className="nav-link dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Categorias
              <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {categories.map(category => (
                  <Link 
                    key={category.id} 
                    to={`/category/${category.slug}`} 
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="navbar-actions">
          <CartWidget />
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="mobile-menu-content">
            <button 
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="mobile-menu-header">
              <h2>Categorías</h2>
            </div>
            <div className="mobile-menu-categories">
              <Link 
                to="/" 
                className="mobile-menu-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-home"></i>
                Home
              </Link>
              {categories.map(category => (
                <Link 
                  key={category.id} 
                  to={`/category/${category.slug}`} 
                  className="mobile-menu-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="fas fa-tag"></i>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
