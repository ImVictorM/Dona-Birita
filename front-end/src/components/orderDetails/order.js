import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestWithCORS from '../../utils/requestWithCORS';
import OrderProducts from './orderProducts';
import SellerControllers from './sellerControllers';
import CustomerControllers from './customerControllers';
import { OrderContext } from '../../context/Context';

function Order() {
  const { id: ID_FROM_URL } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { orderStatus, setOrderStatus } = useContext(OrderContext);

  useEffect(() => {
    setIsLoading(Object.keys(order).length === 0);
  }, [order]);

  useEffect(() => {
    async function fetchOrder() {
      const options = {
        endpoint: `http://localhost:3001/sale/${ID_FROM_URL}`,
        method: 'GET',
      };

      const orderFromDB = await requestWithCORS(options);
      setOrder(orderFromDB);
      setOrderStatus(orderFromDB.status);
    }
    fetchOrder();
  }, [ID_FROM_URL, setOrderStatus]);

  const SLICE_DATE_AT_INDEX = 10;
  const TEST_PREFIX = `${user.role}_order_details__element-order-details-`;

  return (
    <div>
      <h1>Detalhes do produto</h1>
      {
        !isLoading ? (
          <section key={ order.id }>
            <p
              data-testid={ `${TEST_PREFIX}label-order-id` }
            >
              { order.id }
            </p>
            {
              user.role === 'customer' && (
                <p
                  data-testid={ `${TEST_PREFIX}label-seller-name` }
                >
                  { order.seller.name }
                </p>
              )
            }
            <p
              data-testid={ `${TEST_PREFIX}label-order-date` }
            >
              {
                order.saleDate
                  .substring(0, SLICE_DATE_AT_INDEX)
                  .split('-')
                  .reverse()
                  .join('/')
              }
            </p>
            <p
              data-testid={ `${TEST_PREFIX}label-delivery-status` }
            >
              { orderStatus }
            </p>

            {
              user.role === 'customer'
                ? <CustomerControllers />
                : <SellerControllers />
            }

            <div>
              <span>Total: R$ </span>
              <span
                data-testid={
                  `${user.role}_order_details__element-order-total-price`
                }
              >
                {`${order.totalPrice.replace('.', ',')}`}

              </span>
            </div>

            <OrderProducts products={ order.products } />
          </section>
        ) : <p>Loading...</p>
      }

    </div>
  );
}

export default Order;
