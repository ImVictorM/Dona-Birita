import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LOGGED_CUSTOMER, LOGGED_SELLER } from './mocks/userTypes.mock';
import { renderWithRouterAndProvider } from './utils/renderOptions';
import App from '../App';
import OrderProducts from '../components/orderDetails/orderProducts';
import requestWithCORS from '../utils/requestWithCORS';
import toBrazilDate from './utils/toBrazilDate';

import {
  PENDING_ORDER,
  DELIVERED_ORDER,
  IN_TRANSIT_ORDER,
  PREPARING_ORDER,
} from './mocks/orderDetails.mock';

const CUSTOMER_ORDER_DETAILS_ENDPOINT = `/customer/orders/${PENDING_ORDER.id}`;
const SELLER_ORDER_DETAILS_ENDPOINT = `/seller/orders/${PENDING_ORDER.id}`;

const LOADING_TEST_ID = 'loading-img';

describe(`PATH: ${CUSTOMER_ORDER_DETAILS_ENDPOINT} - Customer order details`, () => {
  // Test id customer
  const TEST_PREFIX = 'customer_order_details__';
  const DELIVERED_BTN_TEST_ID = `${TEST_PREFIX}button-delivery-check`;
  const ORDER_ID_TEST_ID = `${TEST_PREFIX}element-order-details-label-order-id`;
  const SELLER_NAME_TEST_ID = `${TEST_PREFIX}element-order-details-label-seller-name`;
  const DATE_TEST_ID = `${TEST_PREFIX}element-order-details-label-order-date`;
  const STATUS_TEST_ID = `${TEST_PREFIX}element-order-details-label-delivery-status`;
  const TOTAL_TEST_ID = `${TEST_PREFIX}element-order-total-price`;

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
  });

  describe('Render', () => {
    beforeEach(async () => {
      requestWithCORS.mockReturnValueOnce(PENDING_ORDER);
      renderWithRouterAndProvider(<App />, CUSTOMER_ORDER_DETAILS_ENDPOINT);

      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toHaveBeenCalledTimes(1));
    });

    it('Renders the order information properly (customer)', () => {
      const orderId = screen.getByTestId(ORDER_ID_TEST_ID).textContent;
      const sellerName = screen.getByTestId(SELLER_NAME_TEST_ID).textContent;
      const orderDate = screen.getByTestId(DATE_TEST_ID).textContent;
      const orderStatus = screen.getByTestId(STATUS_TEST_ID).textContent;
      const orderTotal = screen.getByTestId(TOTAL_TEST_ID).textContent;
      const deliveredBtn = screen.getByTestId(DELIVERED_BTN_TEST_ID);

      expect(orderId).toBe(String(PENDING_ORDER.id));
      expect(sellerName).toBe(PENDING_ORDER.seller.name);
      expect(orderDate).toBe(toBrazilDate(PENDING_ORDER.saleDate));
      expect(orderStatus).toBe(PENDING_ORDER.status);
      expect(orderTotal).toBe(PENDING_ORDER.totalPrice.replace('.', ','));
      expect(deliveredBtn.textContent).toMatch(/entregue/i);
      expect(deliveredBtn).toBeDisabled();
    });
  });

  describe('Functionalities', () => {
    it('Can change an order status to delivered when order in transit', async () => {
      requestWithCORS.mockReturnValueOnce(IN_TRANSIT_ORDER);
      requestWithCORS.mockReturnValueOnce(undefined);
      requestWithCORS.mockReturnValueOnce(DELIVERED_ORDER);

      renderWithRouterAndProvider(<App />, CUSTOMER_ORDER_DETAILS_ENDPOINT);
      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toHaveBeenCalledTimes(1));

      const deliveredBtn = screen.getByTestId(DELIVERED_BTN_TEST_ID);
      expect(deliveredBtn).toBeInTheDocument();
      expect(deliveredBtn).toBeEnabled();

      userEvent.click(deliveredBtn);

      await waitFor(() => {
        expect(screen.getByTestId(STATUS_TEST_ID).textContent)
          .toBe(DELIVERED_ORDER.status);
      });
    });
  });
});

describe(`PATH: ${SELLER_ORDER_DETAILS_ENDPOINT} - Seller order details`, () => {
  // Test id seller
  const TEST_PREFIX = 'seller_order_details__';
  const ORDER_ID_TEST_ID = `${TEST_PREFIX}element-order-details-label-order-id`;
  const SELLER_NAME_TEST_ID = `${TEST_PREFIX}element-order-details-label-seller-name`;
  const DATE_TEST_ID = `${TEST_PREFIX}element-order-details-label-order-date`;
  const STATUS_TEST_ID = `${TEST_PREFIX}element-order-details-label-delivery-status`;
  const TOTAL_TEST_ID = `${TEST_PREFIX}element-order-total-price`;

  const DELIVERED_BTN_TEST_ID = `${TEST_PREFIX}button-delivery-check`;
  const PREPARE_BTN_TEST_ID = `${TEST_PREFIX}button-preparing-check`;
  const DISPATH_BTN_TEST_ID = `${TEST_PREFIX}button-dispatch-check`;

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(LOGGED_SELLER));
  });

  describe('Render', () => {
    beforeEach(async () => {
      requestWithCORS.mockReturnValueOnce(PENDING_ORDER);
      renderWithRouterAndProvider(<App />, SELLER_ORDER_DETAILS_ENDPOINT);

      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toHaveBeenCalledTimes(1));
    });

    it('Renders the order information properly (seller)', () => {
      const orderId = screen.getByTestId(ORDER_ID_TEST_ID).textContent;
      const orderDate = screen.getByTestId(DATE_TEST_ID).textContent;
      const orderStatus = screen.getByTestId(STATUS_TEST_ID).textContent;
      const orderTotal = screen.getByTestId(TOTAL_TEST_ID).textContent;

      const prepareOrderBtn = screen.getByTestId(PREPARE_BTN_TEST_ID);
      const dispathOrderBtn = screen.getByTestId(DISPATH_BTN_TEST_ID);

      const deliveredBtn = screen.queryByTestId(DELIVERED_BTN_TEST_ID);
      const sellerName = screen.queryByTestId(SELLER_NAME_TEST_ID);

      expect(orderId).toBe(String(PENDING_ORDER.id));
      expect(orderDate).toBe(toBrazilDate(PENDING_ORDER.saleDate));
      expect(orderStatus).toBe(PENDING_ORDER.status);
      expect(orderTotal).toBe(PENDING_ORDER.totalPrice.replace('.', ','));

      expect(sellerName).not.toBeInTheDocument();
      expect(deliveredBtn).not.toBeInTheDocument();
      expect(prepareOrderBtn).toBeEnabled();
      expect(dispathOrderBtn).toBeDisabled();
    });
  });

  describe('Functionalities', () => {
    it('Can change the order status to prepare and dispatch', async () => {
      requestWithCORS.mockReturnValueOnce(PENDING_ORDER);

      // first request -> prepare order
      requestWithCORS.mockReturnValueOnce(undefined);
      requestWithCORS.mockReturnValueOnce(PREPARING_ORDER);

      // second request -> dispath order
      requestWithCORS.mockReturnValueOnce(undefined);
      requestWithCORS.mockReturnValueOnce(IN_TRANSIT_ORDER);

      renderWithRouterAndProvider(<App />, SELLER_ORDER_DETAILS_ENDPOINT);

      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toHaveBeenCalledTimes(1));

      const prepareOrderBtn = screen.getByTestId(PREPARE_BTN_TEST_ID);
      const dispathOrderBtn = screen.getByTestId(DISPATH_BTN_TEST_ID);

      expect(screen.getByTestId(STATUS_TEST_ID).textContent).toBe(PENDING_ORDER.status);

      expect(prepareOrderBtn).toBeEnabled();
      expect(dispathOrderBtn).not.toBeEnabled();
      userEvent.click(prepareOrderBtn);

      await waitFor(() => {
        expect(screen.getByTestId(STATUS_TEST_ID).textContent)
          .toBe(PREPARING_ORDER.status);
      });

      expect(prepareOrderBtn).not.toBeEnabled();
      expect(dispathOrderBtn).toBeEnabled();
      userEvent.click(dispathOrderBtn);

      await waitFor(() => {
        expect(screen.getByTestId(STATUS_TEST_ID).textContent)
          .toBe(IN_TRANSIT_ORDER.status);
      });

      expect(dispathOrderBtn).not.toBeEnabled();
    });
  });
});

describe('Order Products Component (seller and customer)', () => {
  beforeEach(async () => {
    renderWithRouterAndProvider(
      <OrderProducts products={ PENDING_ORDER.products } />,
      CUSTOMER_ORDER_DETAILS_ENDPOINT,
    );
  });

  it('Render the order products properly', () => {
    for (let index = 0; index < PENDING_ORDER.products.length; index += 1) {
      const TEST_PREFIX = 'customer_order_details__';
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

      const currentProduct = PENDING_ORDER.products[index];
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
