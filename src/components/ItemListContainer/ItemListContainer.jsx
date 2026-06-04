import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url = 'https://api.escuelajs.co/api/v1/products';
        
        if (slug) {
          url = `https://api.escuelajs.co/api/v1/products?categorySlug=${slug}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Cargando productos...</p>
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

  return (
    <div className="item-list-container-wrapper">
      <h1 className="greeting-title">{greeting || slug}</h1>
      {products.length === 0 ? (
        <Alert variant="info" className="no-products-alert">
          No se encontraron productos en esta categoría.
        </Alert>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;
