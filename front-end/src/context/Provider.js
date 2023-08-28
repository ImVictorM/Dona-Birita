import PropTypes from 'prop-types';
import CartContextProvider from './CartContextProvider';
import OrderContextProvider from './OrderContextProvider';
import ADMContextProvider from './ADMContextProvider';
import LoadingContextProvider from './LoadingContextProvider';

function Provider({ children }) {
  return (
    <CartContextProvider>
      <LoadingContextProvider>
        <OrderContextProvider>
          <ADMContextProvider>
            { children }
          </ADMContextProvider>
        </OrderContextProvider>
      </LoadingContextProvider>
    </CartContextProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
