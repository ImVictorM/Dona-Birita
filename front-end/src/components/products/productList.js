import { useState, useEffect, useContext } from 'react';
import Card from './card';
import styles from './productList.module.scss';
import { GET_ALL_PRODUCTS } from '../../utils/backendEndpoints';
import requestWithCORS from '../../utils/requestWithCORS';
import { LoadingContext } from '../../context/Context';
import Loading from '../loading/loading';

function ProductList() {
  const [products, setProducts] = useState([]);
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    async function fetchProductList() {
      const productsFromDB = await requestWithCORS(GET_ALL_PRODUCTS);
      setProducts(productsFromDB);
      stopLoading();
    }

    startLoading();
    fetchProductList();
  }, [startLoading, stopLoading]);

  return (
    <section className={ styles.wrapper }>
      {
        !isLoading ? (
          <ul className={ styles.products } data-testid="customer_product_list">
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
        ) : (<Loading />)
      }

    </section>
  );
}

export default ProductList;
