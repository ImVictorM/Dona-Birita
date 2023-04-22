import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context/Context';
import requestWithCORS from '../../utils/requestWithCORS';
import OrderProducts from './orderProducts';

function Order() {
  const { id: ID_FROM_URL } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { handleStatus, statusSales } = useContext(Context);

  useEffect(() => {
    setIsLoading(Object.keys(order).length === 0);
  }, [order]);

  useEffect(() => {
    async function fetchOrder() {
      const options = {
        endpoint: `http://localhost:3001/sale/${ID_FROM_URL}`,
        method: 'GET',
      };
      const sale = await requestWithCORS(options);
      setOrder(sale);
    }
    fetchOrder();
  }, [ID_FROM_URL]);

  const SLICE_DATE_AT_INDEX = 10;
  const TEST_PREFIX = `${user.role}_order_details__element-order-details-`;
  const EM_TRANSITO = 'Em Trânsito';

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
              { order.saleDate.substring(0, SLICE_DATE_AT_INDEX)
                .split('-').reverse().join('/') }
            </p>
            <p
              data-testid={ TEST_PREFIX }
            >
              { statusSales }
            </p>

            {
              user.role === 'customer' ? (
                <button
                  type="button"
                  data-testid={ `${user.role}_order_details__button-delivery-check` }
                  disabled={ statusSales !== EM_TRANSITO }
                  onClick={ () => handleStatus('Entregue', ID_FROM_URL) }
                >
                  MARCAR COMO ENTREGUE

                </button>
              ) : (
                <div>
                  <button
                    type="button"
                    data-testid="seller_order_details__button-preparing-check"
                    disabled={ statusSales !== 'Pendente' }
                    onClick={ () => handleStatus('Preparando', ID_FROM_URL) }
                  >
                    PREPARAR PEDIDOS

                  </button>
                  <button
                    type="button"
                    data-testid="seller_order_details__button-dispatch-check"
                    disabled={ ['Pendente', EM_TRANSITO, 'Entregue']
                      .includes(statusSales) }
                    onClick={ () => handleStatus(EM_TRANSITO, ID_FROM_URL) }
                  >
                    SAIU PARA ENTREGA

                  </button>
                </div>
              )
            }

            <p data-testid="customer_order_details__element-order-total-price">
              {`Total: R$ ${order.totalPrice.replace('.', ',')}`}
            </p>
            <OrderProducts products={ order.products } />
          </section>
        ) : <p>Loading...</p>
      }

    </div>
  );
}

export default Order;
