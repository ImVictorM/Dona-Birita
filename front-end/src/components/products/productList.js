import { useState, useEffect } from 'react';
import Card from './card';
import './productList.css';
import { GET_ALL_PRODUCTS } from '../../utils/backendEndpoints';
import requestWithCORS from '../../utils/requestWithCORS';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductList() {
      const productsFromDB = await requestWithCORS(GET_ALL_PRODUCTS);
      setProducts(productsFromDB);
    }
    fetchProductList();
  }, []);

  return (
    <ul className="container-card" data-testid="customer_product_list">
      {
        products.map((product) => (
          <Card
            key={ product.id }
            id={ product.id }
            name={ product.name }
            imag={ product.urlImage }
            price={ product.price }
          />
        ))
      }
    </ul>
  );
}

export default ProductList;
