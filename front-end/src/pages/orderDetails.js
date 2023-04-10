import HeaderPedidos from '../components/cliente-pedidos/header';

function OrderDetails() {
  return (
    <div>
      <HeaderPedidos />
      <h1>Order Details</h1>
      <p data-testid="customer_order_details__element-order-details-label-order-id">
        Order Id
      </p>
      <p data-testid="customer_order_details__element-order-details-label-seller-name">
        Seller Name
      </p>
      <p data-testid="customer_order_details__element-order-details-label-order-date">
        Order Date
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        Delivery Status
      </p>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
      >
        Check?

      </button>
      <p data-testid="customer_order_details__element-order-total-price">Total?</p>
    </div>
  );
}

export default OrderDetails;
