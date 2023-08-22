import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { OrderContext } from '../../context/Context';
import styles from './sellerControllers.module.scss';

function SellerControllers() {
  const { id: ID_FROM_URL } = useParams();
  const { updateOrderStatus, selectedOrder } = useContext(OrderContext);

  return (
    <div className={ styles.order__details__controllers }>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
        disabled={ selectedOrder.status !== 'Pendente' }
        onClick={ () => updateOrderStatus('Preparando', ID_FROM_URL) }
        className={ styles.order__details__controllers__controller }
      >
        PREPARAR PEDIDOS

      </button>
      <button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        disabled={ selectedOrder.status !== 'Preparando' }
        onClick={ () => updateOrderStatus('Em Trânsito', ID_FROM_URL) }
        className={ styles.order__details__controllers__controller }
      >
        SAIU PARA ENTREGA

      </button>
    </div>
  );
}

export default SellerControllers;
