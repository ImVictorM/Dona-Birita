import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import requestWithCORS from '../utils/requestWithCORS';
import ORDER_LIST from './mocks/orders.mock';
import { LOGGED_CUSTOMER, LOGGED_SELLER } from './mocks/userTypes.mock';
import { renderWithRouterAndProvider } from './utils/renderOptions';
import toBrazilDate from './utils/toBrazilDate';

const SELLER_ORDERS_ENDPOINT = '/seller/orders';
const CUSTOMER_ORDERS_ENDPOINT = '/customer/orders';

const LOADING_TEST_ID = 'loading-img';

describe('Testing orders by user', () => {
  beforeEach(() => {
    requestWithCORS.mockReturnValue(ORDER_LIST);
  });

  describe(`PATH: ${SELLER_ORDERS_ENDPOINT} - Testing seller orders`, () => {
    beforeEach(async () => {
      localStorage.setItem('user', JSON.stringify(LOGGED_SELLER));
    });

    const TEST_PREFIX = 'seller_orders__';

    it('Renders all customer orders correctly', async () => {
      renderWithRouterAndProvider(<App />, SELLER_ORDERS_ENDPOINT);
      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toBeCalledTimes(1));

      for (let index = 0; index < ORDER_LIST.length; index += 1) {
        const DATE_TEST_ID = `${TEST_PREFIX}element-order-date-${index + 1}`;
        const INDEX_TEST_ID = `${TEST_PREFIX}element-order-id-${index + 1}`;
        const STATUS_TEST_ID = `${TEST_PREFIX}element-delivery-status-${index + 1}`;
        const TOTAL_TEST_ID = `${TEST_PREFIX}element-card-price-${index + 1}`;
        const ADDRESS_TEST_ID = `${TEST_PREFIX}element-card-address${index + 1}`;

        const orderDate = screen.queryByTestId(DATE_TEST_ID);
        const orderIndex = screen.queryByTestId(INDEX_TEST_ID);
        const orderStatus = screen.queryByTestId(STATUS_TEST_ID);
        const orderTotal = screen.queryByTestId(TOTAL_TEST_ID);
        const orderAddress = screen.queryByTestId(ADDRESS_TEST_ID);

        expect(orderDate).toBeInTheDocument();
        expect(orderIndex).toBeInTheDocument();
        expect(orderStatus).toBeInTheDocument();
        expect(orderTotal).toBeInTheDocument();
        expect(orderAddress).toBeInTheDocument();

        const currentOrder = ORDER_LIST[index];
        const dateExpected = toBrazilDate(currentOrder.saleDate);

        expect(orderDate.textContent).toBe(dateExpected);
        expect(orderIndex.textContent).toBe(String(currentOrder.id));
        expect(orderStatus.textContent).toBe(currentOrder.status);
        expect(orderTotal.textContent).toBe(currentOrder.totalPrice.replace('.', ','));
        expect(orderAddress.textContent)
          .toBe(`${currentOrder.deliveryAddress}, ${currentOrder.deliveryNumber}`);
      }
    });

    // eslint-disable-next-line max-len
    it('Redirects to the order details page when clicking one order (seller)', async () => {
      const { history } = renderWithRouterAndProvider(<App />, SELLER_ORDERS_ENDPOINT);
      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toBeCalledTimes(1));

      const FIRST_ORDER_TEST_ID = `${TEST_PREFIX}element-order-link-1`;
      userEvent.click(screen.getByTestId(FIRST_ORDER_TEST_ID));

      expect(history.location.pathname).toBe('/seller/orders/1');
    });

    it('Renders the correct elements when seller doesn\'t have orders', async () => {
      requestWithCORS.mockReturnValue([]);
      renderWithRouterAndProvider(<App />, SELLER_ORDERS_ENDPOINT);
      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toBeCalledTimes(1));

      const img = screen.getByTestId('empty-orders-img');
      const link = screen.queryByTestId('empty-orders-link');

      expect(img).toBeInTheDocument();
      expect(link).not.toBeInTheDocument();
    });
  });

  describe(`PATH: ${CUSTOMER_ORDERS_ENDPOINT} - Testing customer orders`, () => {
    beforeEach(async () => {
      localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
    });
    const TEST_PREFIX = 'customer_orders__';

    it('Renders all customer orders correctly', async () => {
      renderWithRouterAndProvider(<App />, CUSTOMER_ORDERS_ENDPOINT);
      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toBeCalledTimes(1));

      for (let index = 0; index < ORDER_LIST.length; index += 1) {
        const DATE_TEST_ID = `${TEST_PREFIX}element-order-date-${index + 1}`;
        const INDEX_TEST_ID = `${TEST_PREFIX}element-order-id-${index + 1}`;
        const STATUS_TEST_ID = `${TEST_PREFIX}element-delivery-status-${index + 1}`;
        const TOTAL_TEST_ID = `${TEST_PREFIX}element-card-price-${index + 1}`;
        const ADDRESS_TEST_ID = `${TEST_PREFIX}element-card-address${index + 1}`;

        const orderDate = screen.queryByTestId(DATE_TEST_ID);
        const orderIndex = screen.queryByTestId(INDEX_TEST_ID);
        const orderStatus = screen.queryByTestId(STATUS_TEST_ID);
        const orderTotal = screen.queryByTestId(TOTAL_TEST_ID);
        const orderAddress = screen.queryByTestId(ADDRESS_TEST_ID);

        expect(orderDate).toBeInTheDocument();
        expect(orderIndex).toBeInTheDocument();
        expect(orderStatus).toBeInTheDocument();
        expect(orderTotal).toBeInTheDocument();
        expect(orderAddress).not.toBeInTheDocument();

        const currentOrder = ORDER_LIST[index];

        const dateExpected = toBrazilDate(currentOrder.saleDate);

        expect(orderDate.textContent).toBe(dateExpected);
        expect(orderIndex.textContent).toBe(String(currentOrder.id));
        expect(orderStatus.textContent).toBe(currentOrder.status);
        expect(orderTotal.textContent).toBe(currentOrder.totalPrice.replace('.', ','));
      }
    });

    // eslint-disable-next-line max-len
    it('Redirects to the order details page when clicking one order (customer)', async () => {
      const { history } = renderWithRouterAndProvider(<App />, CUSTOMER_ORDERS_ENDPOINT);
      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toBeCalledTimes(1));

      const FIRST_ORDER_TEST_ID = `${TEST_PREFIX}element-order-link-1`;
      userEvent.click(screen.getByTestId(FIRST_ORDER_TEST_ID));

      expect(history.location.pathname).toBe('/customer/orders/1');
    });

    it('Renders the correct elements when customer doesn\'t have orders', async () => {
      requestWithCORS.mockReturnValue([]);
      const { history } = renderWithRouterAndProvider(<App />, CUSTOMER_ORDERS_ENDPOINT);
      await waitForElementToBeRemoved(() => screen.getByTestId(LOADING_TEST_ID));
      await waitFor(() => expect(requestWithCORS).toBeCalledTimes(1));

      const img = screen.getByTestId('empty-orders-img');
      const link = screen.getByTestId('empty-orders-link');

      expect(img).toBeInTheDocument();
      expect(link).toBeInTheDocument();

      userEvent.click(link);

      expect(history.location.pathname).toBe('/customer/products');
    });
  });
});
