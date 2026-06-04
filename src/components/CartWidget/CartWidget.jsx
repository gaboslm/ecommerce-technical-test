import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartWidget.css';

const CartWidget = () => {
  const navigate = useNavigate();
  const { getCartQuantity } = useCart();
  const cartQuantity = getCartQuantity();

  const handleClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-widget" onClick={handleClick}>
      <i className="fas fa-shopping-cart"></i>
      {cartQuantity > 0 && (
        <span className="cart-badge">{cartQuantity}</span>
      )}
    </div>
  );
};

export default CartWidget;
