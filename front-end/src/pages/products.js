import Header from '../components/header/header';
import ProductList from '../components/products/productList';
import TotalButton from '../components/products/totalButton';

function Product() {
  return (
    <>
      <Header />
      <main>
        <ProductList />
        <TotalButton />
      </main>
    </>
  );
}

export default Product;
