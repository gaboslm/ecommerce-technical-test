import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Brief from '../Brief/Brief';
import './Checkout.css';

const Checkout = () => {
  const { cart, clear, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate order submission
    console.log('Order submitted:', { cart, formData, total: getCartTotal() });
    
    setOrderSubmitted(true);
    clear();
    
    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (orderSubmitted) {
    return (
      <div className="checkout-container">
        <Alert variant="success" className="success-alert">
          <Alert.Heading>
            <i className="fas fa-check-circle"></i>
            ¡Orden Completada con Éxito!
          </Alert.Heading>
          <p>
            Gracias por tu compra. Te hemos enviado un correo de confirmación.
            Serás redirigido a la página principal en unos segundos.
          </p>
        </Alert>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <Alert variant="info" className="info-alert">
          <Alert.Heading>
            <i className="fas fa-info-circle"></i>
            Carrito Vacío
          </Alert.Heading>
          <p>
            Tu carrito de compras está vacío. Agrega productos antes de continuar con el checkout.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Ir al Catálogo
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Finalizar compra</h1>
      
      <Row className="checkout-row">
        <Col md={5} className="checkout-form-col">
          <Card className="form-card">
            <Card.Header className="form-card-header">
              <h3>Información de contacto y envío</h3>
            </Card.Header>
            <Card.Body className="form-card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group" controlId="formName">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu nombre completo"
                  />
                </Form.Group>

                <Form.Group className="form-group" controlId="formEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@correo.com"
                  />
                </Form.Group>

                <Form.Group className="form-group" controlId="formPhone">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 234 567 8900"
                  />
                </Form.Group>

                <Form.Group className="form-group" controlId="formAddress">
                  <Form.Label>Dirección de envío</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Calle, número, apartamento"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="form-group" controlId="formCity">
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Ciudad"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="form-group" controlId="formZipCode">
                      <Form.Label>Código postal</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        placeholder="12345"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="submit-btn">
                  <i className="fas fa-lock"></i>
                  Finalizar Compra
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7} className="checkout-brief-col">
          <Brief />
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
