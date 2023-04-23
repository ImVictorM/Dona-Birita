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
          products.map((product, index) => {
            const {
              name,
              price,
              SaleProduct: { productId, quantity },
            } = product;

            const subTotal = Number(price) * Number(quantity);

            const TEST_PREFIX = 'customer_order_details__element-order-table-';

            return (
              <tr key={ productId }>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX}item-number-${index}` }
                  >
                    { index + 1 }
                  </span>
                </td>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX}name-${index}` }
                  >
                    {name}
                  </span>
                </td>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX}quantity-${index}` }
                  >
                    {quantity}
                  </span>
                </td>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX}unit-price-${index}` }
                  >
                    {Number(price).toFixed(2).replace('.', ',')}
                  </span>
                </td>
                <td>
                  <span
                    data-testid={ `${TEST_PREFIX}sub-total-${index}` }
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
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    SaleProduct: PropTypes.shape({
      productId: PropTypes.number,
      quantity: PropTypes.number,
    }),
  })).isRequired,
};

export default OrderProducts;
