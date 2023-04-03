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
              const { name, id, quantity, price } = product;
              const subTotal = price * quantity;

              // test ids
              const ITEM_NUMBER = `
              customer_checkout__element-order-table-item-number-${index}
              `;
              const ITEM_DESC = `customer_checkout__element-order-table-name-${index}`;
              const ITEM_QUANTITY = `
              customer_checkout__element-order-table-quantity-${index}
              `;
              const ITEM_PRICE = `
              customer_checkout__element-order-table-unit-price-${index}
              `;
              const ITEM_SUB_TOTAL = `
              customer_checkout__element-order-table-sub-total-${index}
              `;
              const REMOVE_ITEM = `
              customer_checkout__element-order-table-remove-${index}
              `;

              return (
                <tr key={ id }>
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
                    <span data-testid={ ITEM_PRICE }>{price}</span>
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
