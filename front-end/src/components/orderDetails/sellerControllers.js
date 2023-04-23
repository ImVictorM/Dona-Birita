import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';

function SellerControllers({ orderStatus }) {
  const { id: ID_FROM_URL } = useParams();
  const { handleStatus } = useContext(Context);

  return (
    <div>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
        disabled={ orderStatus !== 'Pendente' }
        onClick={ () => handleStatus('Preparando', ID_FROM_URL) }
      >
        PREPARAR PEDIDOS

      </button>
      <button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        disabled={
          ['Pendente', 'Em Trânsito', 'Entregue'].includes(orderStatus)
        }
        onClick={ () => handleStatus('Em Trânsito', ID_FROM_URL) }
      >
        SAIU PARA ENTREGA

      </button>
    </div>
  );
}

SellerControllers.propTypes = {
  orderStatus: PropTypes.string.isRequired,
};

export default SellerControllers;
