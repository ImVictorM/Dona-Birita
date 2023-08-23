import CheckoutProducts from '../components/checkout/checkoutProducts';
import CheckoutForm from '../components/checkout/checkoutForm';
import Header from '../components/header/header';

function Checkout() {
  return (
    <>
      <Header />
      <main>
        <CheckoutProducts />
        <CheckoutForm />
      </main>
    </>
  );
}

export default Checkout;
