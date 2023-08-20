import PropTypes from 'prop-types';
import styles from './orderProducts.module.scss';

function OrderProducts({ products }) {
  return (
    <section className={ styles.order__products }>
      <table className={ styles.order__products__table }>
        <caption
          className={ styles.order__products__table__title }
        >
          Produtos Comprados
        </caption>
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
                  <td data-cell="Item">
                    <span
                      data-testid={ `${TEST_PREFIX}item-number-${index}` }
                    >
                      { index + 1 }
                    </span>
                  </td>
                  <td data-cell="Descrição">
                    <span
                      data-testid={ `${TEST_PREFIX}name-${index}` }
                    >
                      {name}
                    </span>
                  </td>
                  <td data-cell="Quantidade">
                    <span
                      data-testid={ `${TEST_PREFIX}quantity-${index}` }
                    >
                      {quantity}
                    </span>
                  </td>
                  <td data-cell="Valor Unitário">
                    <span
                      data-testid={ `${TEST_PREFIX}unit-price-${index}` }
                    >
                      {Number(price).toFixed(2).replace('.', ',')}
                    </span>
                  </td>
                  <td data-cell="Sub-Total">
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
    </section>
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
