import React, { useMemo, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { LoadingContext, OrderContext } from './Context';
import requestWithCORS from '../utils/requestWithCORS';

function OrderContextProvider({ children }) {
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orders, setOrders] = useState([]);
  const { stopLoading, startLoading } = useContext(LoadingContext);

  const fetchOrderByID = useCallback(async (id) => {
    startLoading();

    const options = {
      endpoint: `http://localhost:3001/sale/${id}`,
      method: 'GET',
    };

    const orderFromDB = await requestWithCORS(options);
    setSelectedOrder(orderFromDB);

    stopLoading();
  }, [startLoading, stopLoading]);

  const fetchUserOrders = useCallback(async () => {
    startLoading();

    const user = JSON.parse(localStorage.getItem('user'));
    const options = {
      endpoint: `http://localhost:3001/sale/${user.role}/${user.id}`,
      method: 'GET',
    };
    const ordersFromDB = await requestWithCORS(options);
    setOrders(ordersFromDB);

    stopLoading();
  }, [startLoading, stopLoading]);

  const updateOrderStatus = useCallback(async (status, id) => {
    const options = {
      endpoint: `http://localhost:3001/sale/${id}`,
      method: 'PATCH',
    };
    await requestWithCORS(options, { status });

    await fetchOrderByID(id);
    await fetchUserOrders();
  }, [fetchOrderByID, fetchUserOrders]);

  const clearSelectOrder = useCallback(() => {
    setSelectedOrder({});
  }, []);

  const clearOrders = useCallback(() => {
    setOrders([]);
  }, []);

  const value = useMemo(() => ({
    orders,
    selectedOrder,
    fetchOrderByID,
    updateOrderStatus,
    fetchUserOrders,
    clearOrders,
    clearSelectOrder,
  }), [
    clearOrders,
    clearSelectOrder,
    fetchOrderByID,
    fetchUserOrders,
    orders,
    selectedOrder,
    updateOrderStatus,
  ]);

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
