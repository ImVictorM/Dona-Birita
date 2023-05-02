import PropTypes from 'prop-types';
import CartContextProvider from './CartContextProvider';
import OrderContextProvider from './OrderContextProvider';
import ADMContextProvider from './ADMContextProvider';

function Provider({ children }) {
  return (
    <CartContextProvider>
      <OrderContextProvider>
        <ADMContextProvider>
          { children }
        </ADMContextProvider>
      </OrderContextProvider>
    </CartContextProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
