import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };

    setLoading(true);
    setError(null);
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="error-alert">
        {error}
      </Alert>
    );
  }

  if (!product) {
    return (
      <Alert variant="info" className="no-product-alert">
        Producto no encontrado.
      </Alert>
    );
  }

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;
