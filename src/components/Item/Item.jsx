import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../../context/CartContext';
import './Item.css';

const Item = ({ product }) => {
    const { addItem } = useCart();
  
  return (
    <Card className="product-card">
      <Card.Img 
        variant="top" 
        src={product.images?.[0]} 
        alt={product.title}
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://placehold.co/600x400';
        }}
      />
      <Card.Body>
        <Card.Subtitle className="product-category h5">
          {product.category.name}
        </Card.Subtitle>
        <Card.Title className="product-name">
          {product.title}
        </Card.Title>
        <Card.Text className="product-price">
          ${product.price.toFixed(2)}
        </Card.Text>
        <div className="d-flex gap-2">
          <div className="w-100">
            <Link to={`/item/${product.slug}`} className="w-100">
              <Button variant="primary" className="view-details-btn w-100">
                Ver más
              </Button>
            </Link>
          </div>
          <div className="list-item">
            <Button variant="outline-primary" className="add-to-cart-btn" onClick={() => addItem(product, 1)}>
              <i className="fas fa-cart-plus"></i>
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Item;
