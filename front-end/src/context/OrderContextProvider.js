import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { OrderContext } from './Context';
import requestWithCORS from '../utils/requestWithCORS';

function OrderContextProvider({ children }) {
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orders, setOrders] = useState([]);

  async function fetchOrderByID(id) {
    const options = {
      endpoint: `http://localhost:3001/sale/${id}`,
      method: 'GET',
    };

    const orderFromDB = await requestWithCORS(options);
    setSelectedOrder(orderFromDB);
  }

  async function updateOrderStatus(status, id) {
    const options = {
      endpoint: `http://localhost:3001/sale/${id}`,
      method: 'PATCH',
    };
    await requestWithCORS(options, { status });
  }

  async function fetchUserOrders(userId, userRole) {
    const options = {
      endpoint: `http://localhost:3001/sale/${userRole}/${userId}`,
      method: 'GET',
    };
    const ordersFromDB = await requestWithCORS(options);
    setOrders(ordersFromDB);
  }

  const value = useMemo(() => ({
    orders,
    selectedOrder,
    fetchOrderByID,
    updateOrderStatus,
    fetchUserOrders,
  }), [orders, selectedOrder]);

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
