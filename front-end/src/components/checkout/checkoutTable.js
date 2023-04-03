import { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';

function CheckoutTable() {
  const [cart, setCart] = useState([]);
  const context = useContext(Context);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartFromLocalStorage);
  }, []);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor unitário</td>
            <td>Sub-total</td>
            <td>Remover Item</td>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((product, index) => {
              const { name, productId, quantity, unitPrice, subTotal } = product;

              // test ids
              const ROUTE = 'customer_checkout__element-order-table-';
              const ITEM_NUMBER = `${ROUTE}item-number-${index}`;
              const ITEM_DESC = `${ROUTE}name-${index}`;
              const ITEM_QUANTITY = `${ROUTE}quantity-${index}`;
              const ITEM_PRICE = `${ROUTE}unit-price-${index} `;
              const ITEM_SUB_TOTAL = `${ROUTE}sub-total-${index}`;
              const REMOVE_ITEM = `${ROUTE}remove-${index}`;

              console.log(ITEM_DESC);

              return (
                <tr key={ productId }>
                  <td>
                    <span
                      data-testid={ ITEM_NUMBER }
                    >
                      { index + 1}

                    </span>
                  </td>
                  <td>
                    <span data-testid={ ITEM_DESC }>{name}</span>
                  </td>
                  <td>
                    <span data-testid={ ITEM_QUANTITY }>{quantity}</span>
                  </td>
                  <td>
                    <span data-testid={ ITEM_PRICE }>{unitPrice}</span>
                  </td>
                  <td>
                    <span data-testid={ ITEM_SUB_TOTAL }>{subTotal}</span>
                  </td>
                  <td>
                    <button data-testid={ REMOVE_ITEM } type="button">Remover</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div>
        <span>Total: R$ </span>
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {context.totalPrice}
        </span>
      </div>
    </section>
  );
}

export default CheckoutTable;
