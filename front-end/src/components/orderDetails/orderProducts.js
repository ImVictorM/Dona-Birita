import PropTypes from 'prop-types';

function OrderProducts({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {
          products.length > 0 && products.map((product, index) => {
            const { name, price, SaleProduct: { productId, quantity,
            } } = product;
            const unitPrice = Number(price);
            const subTotal = unitPrice * quantity;

            const TEST_PREFIX2 = 'customer_order_details__element-order-table-';

            return (
              <tr key={ productId }>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX2}item-number-${index}` }
                  >
                    { index + 1}
                  </span>
                </td>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX2}name-${index}` }
                  >
                    {name}
                  </span>
                </td>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX2}quantity-${index}` }
                  >
                    {quantity}
                  </span>
                </td>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX2}unit-price-${index}` }
                  >
                    {Number(unitPrice).toFixed(2).replace('.', ',')}
                  </span>
                </td>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX2}sub-total-${index}` }
                  >
                    {Number(subTotal).toFixed(2).replace('.', ',')}
                  </span>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

OrderProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default OrderProducts;
