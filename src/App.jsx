import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Checkout from './components/Checkout/Checkout';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ItemListContainer greeting="Bienvenido a TechStore" />} />
              <Route path="/category/:slug" element={<ItemListContainer />} />
              <Route path="/item/:slug" element={<ItemDetailContainer />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>&copy; 2024 TechStore. Todos los derechos reservados.</p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
