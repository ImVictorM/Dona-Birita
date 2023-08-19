import { useContext } from 'react';
import { CartContext } from '../../context/Context';
import styles from './checkoutProducts.module.scss';

function CheckoutProducts() {
  const { cartTotal, cart, removeFromCart } = useContext(CartContext);

  return (
    <section className={ styles.checkout }>
      <table className={ styles.checkout__products }>
        <caption className={ styles.checkout__products__title }>Produtos</caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((product, index) => {
              const { name, productId, quantity, unitPrice, subTotal } = product;

              const TEST_PREFIX = 'customer_checkout__element-order-table-';

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
                  <td data-cell="Valor unitário">
                    <div>
                      <span>R$:</span>
                      <span
                        data-testid={ `${TEST_PREFIX}unit-price-${index}` }
                      >
                        {Number(unitPrice).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </td>
                  <td data-cell="Sub-total">
                    <div>
                      <span>R$: </span>
                      <span
                        data-testid={ `${TEST_PREFIX}sub-total-${index}` }
                      >
                        {Number(subTotal).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </td>
                  <td data-cell="Remover item">
                    <button
                      data-testid={ `${TEST_PREFIX}remove-${index}` }
                      type="button"
                      id={ productId }
                      onClick={ () => removeFromCart(productId) }
                    >
                      Remover

                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div className={ styles.checkout__total }>
        <span>Total: R$ </span>
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {Number(cartTotal).toFixed(2).replace('.', ',')}
        </span>
      </div>
    </section>
  );
}

export default CheckoutProducts;
