import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from '../../context/Context';
import styles from './orderList.module.scss';

function OrderList() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { orders, fetchUserOrders } = useContext(OrderContext);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const SLICE_DATE_AT_INDEX = 10;

  return (
    <section className={ styles.orders }>
      {
        orders.map((order) => (
          <Link
            to={ `/${user.role}/orders/${order.id}` }
            key={ order.id }
            className={ styles.orders__card }
            data-testid={ `${user.role}_orders__element-order-link-${order.id}` }
          >
            <div className={ styles.orders__card__cell }>
              <span className={ styles.orders__card__cell__title }>Data</span>
              <span
                data-testid={ `${user.role}_orders__element-order-date-${order.id}` }
              >
                {
                  order.saleDate
                    .toLocaleString()
                    .substr(0, SLICE_DATE_AT_INDEX)
                    .split('-').reverse()
                    .join('/')
                }
              </span>
            </div>
            <div className={ styles.orders__card__cell }>
              <span className={ styles.orders__card__cell__title }>Pedido</span>
              <span
                data-testid={ `${user.role}_orders__element-order-id-${order.id}` }
              >
                {order.id}
              </span>
            </div>
            <div className={ styles.orders__card__cell }>
              <span className={ styles.orders__card__cell__title }>Status</span>
              <span
                data-testid={ `${user.role}_orders__element-delivery-status-${order.id}` }
              >
                {order.status}
              </span>
            </div>
            <div className={ styles.orders__card__cell }>
              <span className={ styles.orders__card__cell__title }>Total</span>
              <div>
                <span>R$: </span>
                <span
                  data-testid={ `${user.role}_orders__element-card-price-${order.id}` }
                >
                  {order.totalPrice.replace('.', ',')}
                </span>
              </div>
            </div>
            {
              user.role === 'seller' && (
                <div className={ styles.orders__card__cell }>
                  <span className={ styles.orders__card__cell__title }>Endereço</span>
                  <span
                    data-testid={ `seller_orders__element-card-address${order.id}` }
                  >
                    {`${order.deliveryAddress}, ${order.deliveryNumber}`}
                  </span>
                </div>
              )
            }
          </Link>
        ))
      }
    </section>
  );
}

export default OrderList;
