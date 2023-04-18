import HeaderPedidos from '../components/cliente-pedidos/header';
import ProductList from '../components/products/productList';
import TotalButton from '../components/products/totalButton';

function Product() {
  return (
    <section>
      <HeaderPedidos />
      <ProductList />
      <TotalButton />
    </section>
  );
}

export default Product;
