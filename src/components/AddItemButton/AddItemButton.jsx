import Button from 'react-bootstrap/Button';
import { useCart } from '../../context/CartContext';
import './AddItemButton.css';

const AddItemButton = ({ product, quantity }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <Button 
      variant="primary" 
      className="add-to-cart-btn"
      onClick={handleAddToCart}
    >
      <i className="fas fa-cart-plus"></i>
      Agregar al Carrito
    </Button>
  );
};

export default AddItemButton;
