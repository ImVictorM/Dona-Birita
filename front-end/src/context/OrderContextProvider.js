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
    const user = JSON.parse(localStorage.getItem('user'));
    const options = {
      endpoint: `http://localhost:3001/sale/${user.role}/${user.id}`,
      method: 'GET',
    };
    const ordersFromDB = await requestWithCORS(options);
    setOrders(ordersFromDB);
  }, []);

  const updateOrderStatus = useCallback(async (status, id) => {
    const options = {
      endpoint: `http://localhost:3001/sale/${id}`,
      method: 'PATCH',
    };
    await requestWithCORS(options, { status });
    fetchOrderByID(id);
  }, [fetchOrderByID]);

  const value = useMemo(() => ({
    orders,
    selectedOrder,
    fetchOrderByID,
    updateOrderStatus,
    fetchUserOrders,
  }), [fetchOrderByID, fetchUserOrders, orders, selectedOrder, updateOrderStatus]);

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
