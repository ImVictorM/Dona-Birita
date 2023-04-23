import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { OrderContext } from './Context';
import requestWithCORS from '../utils/requestWithCORS';

function OrderContextProvider({ children }) {
  const [orderStatus, setOrderStatus] = useState('');

  async function updateOrderStatus(status, id) {
    const options = {
      endpoint: `http://localhost:3001/sale/${id}`,
      method: 'PATCH',
    };
    await requestWithCORS(options, { status });
    setOrderStatus(status);
  }

  const value = useMemo(() => ({
    updateOrderStatus,
    orderStatus,
    setOrderStatus,
  }), [orderStatus]);

  return (
    <OrderContext.Provider value={ value }>
      {children}
    </OrderContext.Provider>
  );
}

OrderContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrderContextProvider;
