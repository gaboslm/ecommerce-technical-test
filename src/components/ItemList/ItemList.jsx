import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Item from '../Item/Item';
import './ItemList.css';

const ItemList = ({ products }) => {
  return (
    <div className="item-list-container">
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Item product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ItemList;
