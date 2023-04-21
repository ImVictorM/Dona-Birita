import CheckoutTable from '../components/checkout/checkoutTable';
import CheckoutForm from '../components/checkout/checkoutForm';
import Header from '../components/header/header';

function Checkout() {
  return (
    <div>
      <Header />
      <CheckoutTable />
      <CheckoutForm />
    </div>
  );
}

export default Checkout;
