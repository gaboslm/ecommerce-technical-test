import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ItemQuantitySelector from '../ItemQuantitySelector/ItemQuantitySelector';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/600x400';
  const categoryName = product.category ? product.category.name : 'Sin categoría';

  return (
    <div className="item-detail-container">
      <Card className="item-detail-card">
        <Card.Img 
          variant="top" 
          src={mainImage} 
          alt={product.title}
          className="item-detail-image"
        />
        <Card.Body className="item-detail-body">
          <Badge bg="secondary" className="item-category-badge">
            {categoryName}
          </Badge>
          <Card.Title className="item-detail-title">
            {product.title}
          </Card.Title>
          <Card.Text className="item-detail-price">
            ${product.price.toFixed(2)}
          </Card.Text>
          <Card.Text className="item-detail-description">
            {product.description}
          </Card.Text>
          <ItemQuantitySelector product={product} stock={10} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemDetail;
