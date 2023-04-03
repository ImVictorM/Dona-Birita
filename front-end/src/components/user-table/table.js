import React, { useEffect, useState } from 'react';

function UserTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    async function fetchOrders() {
      const response = await fetch(`http://localhost:3001/customer/orders/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  const SUBSTR = 10;
  return (
    <div>
      <table>
        <tbody>
          {orders.map((order) => (
            <tr key={ order.id }>
              <td
                data-testid={ `seller_orders__element-order-id-${order.id}` }
              >
                {order.id}
              </td>
              <td
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
              >
                {order.status}
              </td>
              <td
                data-testid={ `customer_orders__element-order-date-${order.id}` }
              >
                {order.saleDate
                  .toLocaleString().substr(0, SUBSTR).split('-').reverse()
                  .join('/') }
              </td>

              <td
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                {`R$ ${order.totalPrice}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;