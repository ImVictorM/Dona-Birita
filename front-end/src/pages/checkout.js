import CheckoutProducts from '../components/checkout/checkoutProducts';
import CheckoutForm from '../components/checkout/checkoutForm';
import Header from '../components/header/header';

function Checkout() {
  return (
    <div>
      <Header />
      <CheckoutProducts />
      <CheckoutForm />
    </div>
  );
}

export default Checkout;
