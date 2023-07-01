import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LOGGED_CUSTOMER } from './mocks/userTypes.mock';
import { renderWithRouterAndProvider } from './utils/renderOptions';
import App from '../App';
import requestWithCORS from '../utils/requestWithCORS';
import toBrazilDate from './utils/toBrazilDate';

import {
  PENDING_CUSTOMER_ORDER,
  DELIVERED_CUSTOMER_ORDER,
  IN_TRANSIT_CUSTOMER_ORDER,
} from './mocks/orderDetails.mock';

const ORDER_DETAILS_ENDPOINT = `/customer/orders/${PENDING_CUSTOMER_ORDER.id}`;

describe(`PATH: ${ORDER_DETAILS_ENDPOINT} - Testing Customer Order details`, () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
  });

  // Test ids
  const TEST_PREFIX = 'customer_order_details__';
  const DELIVERED_BTN_TEST_ID = `${TEST_PREFIX}button-delivery-check`;
  const ORDER_ID_TEST_ID = `${TEST_PREFIX}element-order-details-label-order-id`;
  const SELLER_NAME_TEST_ID = `${TEST_PREFIX}element-order-details-label-seller-name`;
  const DATE_TEST_ID = `${TEST_PREFIX}element-order-details-label-order-date`;
  const STATUS_TEST_ID = `${TEST_PREFIX}element-order-details-label-delivery-status`;
  const TOTAL_TEST_ID = `${TEST_PREFIX}element-order-total-price`;

  describe('Render', () => {
    beforeEach(async () => {
      requestWithCORS.mockReturnValueOnce(PENDING_CUSTOMER_ORDER);
      renderWithRouterAndProvider(<App />, ORDER_DETAILS_ENDPOINT);
      await waitFor(() => expect(requestWithCORS).toHaveBeenCalledTimes(1));
    });

    it('Renders the order information properly', () => {
      const orderId = screen.getByTestId(ORDER_ID_TEST_ID).textContent;
      const sellerName = screen.getByTestId(SELLER_NAME_TEST_ID).textContent;
      const orderDate = screen.getByTestId(DATE_TEST_ID).textContent;
      const orderStatus = screen.getByTestId(STATUS_TEST_ID).textContent;
      const orderTotal = screen.getByTestId(TOTAL_TEST_ID).textContent;
      const deliveredBtn = screen.getByTestId(DELIVERED_BTN_TEST_ID);

      expect(orderId).toBe(String(PENDING_CUSTOMER_ORDER.id));
      expect(sellerName).toBe(PENDING_CUSTOMER_ORDER.seller.name);
      expect(orderDate).toBe(toBrazilDate(PENDING_CUSTOMER_ORDER.saleDate));
      expect(orderStatus).toBe(PENDING_CUSTOMER_ORDER.status);
      expect(orderTotal).toBe(PENDING_CUSTOMER_ORDER.totalPrice.replace('.', ','));
      expect(deliveredBtn.textContent).toMatch(/entregue/i);
      expect(deliveredBtn).toBeDisabled();
    });

    it('Render the order products properly', () => {
      for (let index = 0; index < PENDING_CUSTOMER_ORDER.products.length; index += 1) {
        const INDEX_TEST_ID = `${TEST_PREFIX}element-order-table-item-number-${index}`;
        const PRODUCT_TEST_ID = `${TEST_PREFIX}element-order-table-name-${index}`;
        const QUANTITY_TEST_ID = `${TEST_PREFIX}element-order-table-quantity-${index}`;
        const UNIT_TEST_ID = `${TEST_PREFIX}element-order-table-unit-price-${index}`;
        const ITEM_TOTAL_TEST_ID = `${TEST_PREFIX}element-order-table-sub-total-${index}`;

        const productIndex = screen.getByTestId(INDEX_TEST_ID).textContent;
        const productName = screen.getByTestId(PRODUCT_TEST_ID).textContent;
        const productQuantity = screen.getByTestId(QUANTITY_TEST_ID).textContent;
        const unitPrice = screen.getByTestId(UNIT_TEST_ID).textContent;
        const totalPrice = screen.getByTestId(ITEM_TOTAL_TEST_ID).textContent;

        const currentProduct = PENDING_CUSTOMER_ORDER.products[index];
        const {
          SaleProduct: { quantity },
          name,
          price,
        } = currentProduct;

        const expTotal = Number(price) * quantity;

        expect(productIndex).toBe(String(index + 1));
        expect(productName).toBe(name);
        expect(productQuantity).toBe(String(quantity));
        expect(unitPrice).toBe(price.replace('.', ','));
        expect(totalPrice).toBe(expTotal.toFixed(2).replace('.', ','));
      }
    });
  });

  describe('Functionalities', () => {
    it('Can change an order status to delivered when order in transit', async () => {
      requestWithCORS.mockReturnValueOnce(IN_TRANSIT_CUSTOMER_ORDER);
      requestWithCORS.mockReturnValueOnce(undefined);
      requestWithCORS.mockReturnValueOnce(DELIVERED_CUSTOMER_ORDER);

      renderWithRouterAndProvider(<App />, ORDER_DETAILS_ENDPOINT);
      await waitFor(() => expect(requestWithCORS).toHaveBeenCalledTimes(1));

      const deliveredBtn = screen.getByTestId(DELIVERED_BTN_TEST_ID);
      expect(deliveredBtn).toBeInTheDocument();
      expect(deliveredBtn).toBeEnabled();

      userEvent.click(deliveredBtn);

      await waitFor(() => {
        expect(screen.getByTestId(STATUS_TEST_ID).textContent)
          .toBe(DELIVERED_CUSTOMER_ORDER.status);
      });
    });
  });
});
