import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddItemButton from '../AddItemButton/AddItemButton';
import './ItemQuantitySelector.css';

const ItemQuantitySelector = ({ product, stock }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="quantity-selector">
      <div className="quantity-controls">
        <Button 
          variant="outline-secondary" 
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="quantity-btn"
        >
          -
        </Button>
        <span className="quantity-display">{quantity}</span>
        <Button 
          variant="outline-secondary" 
          onClick={handleIncrement}
          disabled={quantity >= stock}
          className="quantity-btn"
        >
          +
        </Button>
      </div>
      <AddItemButton product={product} quantity={quantity} />
    </div>
  );
};

export default ItemQuantitySelector;
