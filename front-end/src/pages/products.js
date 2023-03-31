import { useEffect, useState } from 'react';
import HeaderPedidos from '../components/cliente-pedidos/header';
import Card from '../components/cliente-pedidos/card';

function Product() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      const endpoint = 'http://localhost:3001/product/';
      const result = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const productsList = await result.json();
      setProducts(productsList);
    }
    fetchProduct();
  }, []);
  return (
    <div>
      <h1>Product!</h1>
      <HeaderPedidos />
      <ul>
        { products.map((product) => (
          <Card
            key={ product.id }
            id={ product.id }
            name={ product.name }
            imag={ product.urlImage }
            price={ product.price }
          />)) }
      </ul>
    </div>
  );
}

export default Product;
