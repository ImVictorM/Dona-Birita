import PropTypes from 'prop-types';
import CartContextProvider from './CartContextProvider';
import OrderContextProvider from './OrderContextProvider';
import UserContextProvider from './UserContextProvider';

function Provider({ children }) {
  return (
    <CartContextProvider>
      <OrderContextProvider>
        <UserContextProvider>
          { children }
        </UserContextProvider>
      </OrderContextProvider>
    </CartContextProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
