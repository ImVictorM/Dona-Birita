import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderProducts from './orderProducts';
import SellerControllers from './sellerControllers';
import CustomerControllers from './customerControllers';
import { LoadingContext, OrderContext } from '../../context/Context';
import styles from './order.module.scss';
import Loading from '../loading/loading';

function Order() {
  const { id: ID_FROM_URL } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const { fetchOrderByID, selectedOrder } = useContext(OrderContext);
  const { isLoading } = useContext(LoadingContext);

  useEffect(() => {
    const hasNotSelectedOrder = Object.keys(selectedOrder).length === 0;
    const isDifferentOrder = Number(selectedOrder.id) !== Number(ID_FROM_URL);

    if (hasNotSelectedOrder || isDifferentOrder) {
      fetchOrderByID(ID_FROM_URL);
    }
  }, [ID_FROM_URL, fetchOrderByID, selectedOrder]);

  const SLICE_DATE_AT_INDEX = 10;
  const TEST_PREFIX = `${user.role}_order_details__element-order-details-`;

  return (
    <section className={ styles.order }>
      {
        !isLoading && Number(selectedOrder.id) === Number(ID_FROM_URL) ? (
          <>
            <section className={ styles.order__details }>
              <h1 className={ styles.order__details__title }>Detalhes do Pedido</h1>
              <p className={ styles.order__details__datarow }>
                <span>Nº Pedido: </span>
                <span
                  data-testid={ `${TEST_PREFIX}label-order-id` }
                >
                  { selectedOrder.id }
                </span>
              </p>
              {
                user.role === 'customer' && (
                  <p className={ styles.order__details__datarow }>
                    <span>Vendedor: </span>
                    <span
                      data-testid={ `${TEST_PREFIX}label-seller-name` }
                    >
                      { selectedOrder.seller.name }
                    </span>
                  </p>
                )
              }
              <p className={ styles.order__details__datarow }>
                <span>Data: </span>
                <span
                  data-testid={ `${TEST_PREFIX}label-order-date` }
                >
                  {
                    selectedOrder.saleDate
                      .substring(0, SLICE_DATE_AT_INDEX)
                      .split('-')
                      .reverse()
                      .join('/')
                  }
                </span>
              </p>
              <p className={ styles.order__details__datarow }>
                <span>Status: </span>
                <span
                  data-testid={ `${TEST_PREFIX}label-delivery-status` }
                >
                  { selectedOrder.status }
                </span>
              </p>

              {
                user.role === 'customer'
                  ? <CustomerControllers />
                  : <SellerControllers />
              }

              <p className={ styles.order__details__total }>
                <span>Total: R$ </span>
                <span
                  data-testid={
                    `${user.role}_order_details__element-order-total-price`
                  }
                >
                  {`${selectedOrder.totalPrice.replace('.', ',')}`}

                </span>
              </p>

            </section>
            <OrderProducts products={ selectedOrder.products } />
          </>
        ) : (
          <Loading />
        )
      }

    </section>
  );
}

export default Order;
