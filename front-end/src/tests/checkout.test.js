import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LOGGED_CUSTOMER } from './mocks/userTypes.mock';
import requestWithCORS from '../utils/requestWithCORS';
import { renderWithRouterAndProvider } from './utils/renderOptions';
import App from '../App';

import {
  CART, SELLER_LIST,
  ORDER_TO_CHECKOUT,
  CHECKOUT_RESPONSE,
} from './mocks/checkout.mock';

const CHECKOUT_ENDPOINT = '/customer/checkout';

// Checkout form test id
const TEST_PREFIX = 'customer_checkout__';
const SELECT_SELLER_TEST_ID = `${TEST_PREFIX}select-seller`;
const ADDRESS_INPUT_TEST_ID = `${TEST_PREFIX}input-address`;
const ADDR_NUMBER_TEST_ID = `${TEST_PREFIX}input-address-number`;
const FINISH_ORDER_BTN_TEST_ID = `${TEST_PREFIX}button-submit-order`;

describe(`PATH: ${CHECKOUT_ENDPOINT} - Testing checkout process`, () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
    localStorage.setItem('cart', JSON.stringify(CART));
    requestWithCORS.mockReturnValueOnce(SELLER_LIST);
  });

  describe('Render', () => {
    beforeEach(async () => {
      renderWithRouterAndProvider(<App />, CHECKOUT_ENDPOINT);
      await waitFor(() => expect(requestWithCORS).toHaveBeenCalledTimes(1));
    });

    it('Renders the cart information and total on the screen', () => {
      for (let index = 0; index < CART.length; index += 1) {
        const INDEX_TEST_ID = `${TEST_PREFIX}element-order-table-item-number-${index}`;
        const DESC_TEST_ID = `${TEST_PREFIX}element-order-table-name-${index}`;
        const QUANTITY_TEST_ID = `${TEST_PREFIX}element-order-table-quantity-${index}`;
        const PRICE_TEST_ID = `${TEST_PREFIX}element-order-table-unit-price-${index}`;
        const ITEM_TOTAL_TEST_ID = `${TEST_PREFIX}element-order-table-sub-total-${index}`;
        const REMOVE_BTN_TEST_ID = `${TEST_PREFIX}element-order-table-remove-${index}`;

        const currentItem = CART[index];

        expect(screen.getByTestId(INDEX_TEST_ID).textContent)
          .toBe(String(index + 1));

        expect(screen.getByTestId(DESC_TEST_ID).textContent)
          .toBe(currentItem.name);

        expect(screen.getByTestId(QUANTITY_TEST_ID).textContent)
          .toBe(String(currentItem.quantity));

        expect(screen.getByTestId(PRICE_TEST_ID).textContent)
          .toBe(Number(currentItem.unitPrice).toFixed(2).replace('.', ','));

        expect(screen.getByTestId(ITEM_TOTAL_TEST_ID).textContent)
          .toBe(currentItem.subTotal.toFixed(2).replace('.', ','));

        expect(screen.getByTestId(REMOVE_BTN_TEST_ID)).toBeInTheDocument();
      }

      const CART_TOTAL_TEST_ID = `${TEST_PREFIX}element-order-total-price`;
      const cartTotal = screen.getByTestId(CART_TOTAL_TEST_ID).textContent;
      const expectedTotal = CART.reduce((acc, curr) => acc + curr.subTotal, 0);

      expect(cartTotal).toBe(expectedTotal.toFixed(2).replace('.', ','));
    });

    it('Renders the checkout form correctly', () => {
      const selectSellerInput = screen.queryByTestId(SELECT_SELLER_TEST_ID);
      const addressInput = screen.queryByTestId(ADDRESS_INPUT_TEST_ID);
      const addrNumberInput = screen.queryByTestId(ADDR_NUMBER_TEST_ID);
      const finishOrderBtn = screen.queryByTestId(FINISH_ORDER_BTN_TEST_ID);

      expect(selectSellerInput).toBeInTheDocument();
      expect(selectSellerInput.options[selectSellerInput.selectedIndex].textContent)
        .toBe(SELLER_LIST[0].name);
      expect(addressInput).toBeInTheDocument();
      expect(addrNumberInput).toBeInTheDocument();
      expect(finishOrderBtn).toBeInTheDocument();
    });
  });

  describe('Functionalities', () => {
    it('Can remove an item from cart', async () => {
      renderWithRouterAndProvider(<App />, CHECKOUT_ENDPOINT);
      await waitFor(() => expect(requestWithCORS).toHaveBeenCalledTimes(1));

      const INDEX_TEST_ID = `${TEST_PREFIX}element-order-table-item-number-0`;
      const DESC_TEST_ID = `${TEST_PREFIX}element-order-table-name-0`;
      const QUANTITY_TEST_ID = `${TEST_PREFIX}element-order-table-quantity-0`;
      const UNIT_PRICE_TEST_ID = `${TEST_PREFIX}element-order-table-unit-price-0`;
      const ITEM_TOTAL_TEST_ID = `${TEST_PREFIX}element-order-table-sub-total-0`;
      const REMOVE_BTN_TEST_ID = `${TEST_PREFIX}element-order-table-remove-0`;

      const index = screen.queryByTestId(INDEX_TEST_ID);
      const desc = screen.queryByTestId(DESC_TEST_ID);
      const quantity = screen.queryByTestId(QUANTITY_TEST_ID);
      const unitPrice = screen.queryByTestId(UNIT_PRICE_TEST_ID);
      const itemTotal = screen.queryByTestId(ITEM_TOTAL_TEST_ID);
      const removeButton = screen.queryByTestId(REMOVE_BTN_TEST_ID);

      expect(index).toBeInTheDocument();
      expect(desc).toBeInTheDocument();
      expect(quantity).toBeInTheDocument();
      expect(unitPrice).toBeInTheDocument();
      expect(itemTotal).toBeInTheDocument();
      expect(removeButton).toBeInTheDocument();

      userEvent.click(removeButton);

      expect(index).not.toBeInTheDocument();
      expect(desc).not.toBeInTheDocument();
      expect(quantity).not.toBeInTheDocument();
      expect(unitPrice).not.toBeInTheDocument();
      expect(itemTotal).not.toBeInTheDocument();
      expect(removeButton).not.toBeInTheDocument();
    });

    it('Can checkout an order and redirect', async () => {
      requestWithCORS.mockReturnValueOnce(CHECKOUT_RESPONSE);

      const { history } = renderWithRouterAndProvider(<App />, CHECKOUT_ENDPOINT);
      await waitFor(() => expect(requestWithCORS).toHaveBeenCalledTimes(1));

      const addressInput = screen.queryByTestId(ADDRESS_INPUT_TEST_ID);
      const addrNumberInput = screen.queryByTestId(ADDR_NUMBER_TEST_ID);
      const finishOrderBtn = screen.queryByTestId(FINISH_ORDER_BTN_TEST_ID);

      userEvent.type(addressInput, ORDER_TO_CHECKOUT.address);
      userEvent.type(addrNumberInput, ORDER_TO_CHECKOUT.number);

      userEvent.click(finishOrderBtn);

      await waitFor(() => {
        const expectedPath = `/customer/orders/${CHECKOUT_RESPONSE.id}`;
        expect(history.location.pathname).toBe(expectedPath);
      });
    });
  });
});
