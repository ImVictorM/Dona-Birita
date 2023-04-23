import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context/Context';

function CustomerControllers({ orderStatus }) {
  const { id: ID_FROM_URL } = useParams();
  const { handleStatus } = useContext(Context);

  return (
    <button
      type="button"
      data-testid="customer_order_details__button-delivery-check"
      disabled={ orderStatus !== 'Em Trânsito' }
      onClick={ () => handleStatus('Entregue', ID_FROM_URL) }
    >
      MARCAR COMO ENTREGUE

    </button>
  );
}

CustomerControllers.propTypes = {
  orderStatus: PropTypes.string.isRequired,
};

export default CustomerControllers;
