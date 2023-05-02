import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../context/Context';
import './totalButton.css';

function TotalButton() {
  const history = useHistory();
  const { cartTotal } = useContext(CartContext);
  return (
    <button
      data-testid="customer_products__button-cart"
      type="button"
      disabled={ cartTotal === '0.00' }
      onClick={ () => history.push('/customer/checkout') }
      className="cart-button"
    >
      <span>🛒 Total - R$: </span>
      <span data-testid="customer_products__checkout-bottom-value">
        { `${cartTotal}`.replace('.', ',') }
      </span>
    </button>
  );
}

export default TotalButton;
