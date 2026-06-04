import { useCart } from '../../context/CartContext';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import './Brief.css';

const Brief = () => {
  const { cart, removeItem, getCartTotal } = useCart();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <Card className="empty-cart-card">
        <Card.Body>
          <p className="empty-cart-message">
            <i className="fas fa-shopping-cart"></i>
            Tu carrito está vacío
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="brief-card">
      <Card.Header className="brief-header">
        <h3>Resumen de compra</h3>
      </Card.Header>
      <Card.Body className="brief-body">
        <Table responsive className="brief-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="product-cell">
                  <img src={item.images?.[0] || 'https://placehold.co/600x400'} alt={item.name} className="product-thumb" />
                  <span className="product-name">{item.name}</span>
                </td>
                <td className="price-cell">${item.price.toFixed(2)}</td>
                <td className="quantity-cell">{item.quantity}</td>
                <td className="subtotal-cell">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="action-cell">
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="total-label">Total a Pagar:</td>
              <td className="total-amount">${total.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Brief;
