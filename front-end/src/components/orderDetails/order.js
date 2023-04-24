import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderProducts from './orderProducts';
import SellerControllers from './sellerControllers';
import CustomerControllers from './customerControllers';
import { OrderContext } from '../../context/Context';

function Order() {
  const { id: ID_FROM_URL } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  const { fetchOrderByID, selectedOrder } = useContext(OrderContext);

  useEffect(() => {
    setIsLoading(Object.keys(selectedOrder).length === 0);
  }, [selectedOrder]);

  useEffect(() => {
    fetchOrderByID(ID_FROM_URL);
  }, [ID_FROM_URL, fetchOrderByID]);

  const SLICE_DATE_AT_INDEX = 10;
  const TEST_PREFIX = `${user.role}_order_details__element-order-details-`;

  return (
    <div>
      <h1>Detalhes do produto</h1>
      {
        !isLoading ? (
          <section key={ selectedOrder.id }>
            <p
              data-testid={ `${TEST_PREFIX}label-order-id` }
            >
              { selectedOrder.id }
            </p>
            {
              user.role === 'customer' && (
                <p
                  data-testid={ `${TEST_PREFIX}label-seller-name` }
                >
                  { selectedOrder.seller.name }
                </p>
              )
            }
            <p
              data-testid={ `${TEST_PREFIX}label-order-date` }
            >
              {
                selectedOrder.saleDate
                  .substring(0, SLICE_DATE_AT_INDEX)
                  .split('-')
                  .reverse()
                  .join('/')
              }
            </p>
            <p
              data-testid={ `${TEST_PREFIX}label-delivery-status` }
            >
              { selectedOrder.status }
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
                {`${selectedOrder.totalPrice.replace('.', ',')}`}

              </span>
            </div>

            <OrderProducts products={ selectedOrder.products } />
          </section>
        ) : <p>Loading...</p>
      }

    </div>
  );
}

export default Order;
