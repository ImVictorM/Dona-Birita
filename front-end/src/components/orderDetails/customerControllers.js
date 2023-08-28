import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { OrderContext } from '../../context/Context';
import styles from './customerControllers.module.scss';

function CustomerControllers() {
  const { id: ID_FROM_URL } = useParams();
  const { updateOrderStatus, selectedOrder } = useContext(OrderContext);

  return (
    <button
      type="button"
      data-testid="customer_order_details__button-delivery-check"
      disabled={ selectedOrder.status !== 'Em Trânsito' }
      onClick={ () => updateOrderStatus('Entregue', ID_FROM_URL) }
      className={ styles.order__details__controller }
    >
      MARCAR COMO ENTREGUE

    </button>
  );
}

export default CustomerControllers;
