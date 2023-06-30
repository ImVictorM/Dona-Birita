import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import requestWithCORS from '../utils/requestWithCORS';
import ORDER_LIST from './mocks/orders.mock';
import { LOGGED_CUSTOMER, LOGGED_SELLER } from './mocks/userTypes.mock';
import { renderWithRouterAndProvider } from './utils/renderOptions';

const SELLER_ORDERS_ENDPOINT = '/seller/orders';
const CUSTOMER_ORDERS_ENDPOINT = '/customer/orders';

describe('Testing orders by user', () => {
  beforeEach(() => {
    requestWithCORS.mockReturnValue(ORDER_LIST);
  });

  describe('PATH: /seller/orders - Testing seller orders', () => {
    const FIRST_ORDER_TEST_ID = 'seller_orders__element-order-link-1';

    beforeEach(async () => {
      localStorage.setItem('user', JSON.stringify(LOGGED_SELLER));
    });

    it('Renders all customer orders correctly', async () => {
      renderWithRouterAndProvider(<App />, SELLER_ORDERS_ENDPOINT);
      await waitFor(() => screen.getByTestId(FIRST_ORDER_TEST_ID));

      for (let index = 0; index < ORDER_LIST.length; index += 1) {
        const DATE_TEST_ID = `seller_orders__element-order-date-${index + 1}`;
        const INDEX_TEST_ID = `seller_orders__element-order-id-${index + 1}`;
        const STATUS_TEST_ID = `seller_orders__element-delivery-status-${index + 1}`;
        const TOTAL_TEST_ID = `seller_orders__element-card-price-${index + 1}`;
        const ADDRESS_TEST_ID = `seller_orders__element-card-address${index + 1}`;

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
        const onlyDateIndex = 10;
        const dateExpected = currentOrder.saleDate
          .toLocaleString()
          .substring(0, onlyDateIndex)
          .split('-').reverse()
          .join('/');

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
      await waitFor(() => screen.getByTestId(FIRST_ORDER_TEST_ID));

      userEvent.click(screen.getByTestId(FIRST_ORDER_TEST_ID));

      expect(history.location.pathname).toBe('/seller/orders/1');
    });
  });

  describe('PATH: /customer/orders - Testing customer orders', () => {
    const FIRST_ORDER_TEST_ID = 'customer_orders__element-order-link-1';

    beforeEach(async () => {
      localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
    });

    it('Renders all customer orders correctly', async () => {
      renderWithRouterAndProvider(<App />, CUSTOMER_ORDERS_ENDPOINT);
      await waitFor(() => screen.getByTestId(FIRST_ORDER_TEST_ID));

      for (let index = 0; index < ORDER_LIST.length; index += 1) {
        const DATE_TEST_ID = `customer_orders__element-order-date-${index + 1}`;
        const INDEX_TEST_ID = `customer_orders__element-order-id-${index + 1}`;
        const STATUS_TEST_ID = `customer_orders__element-delivery-status-${index + 1}`;
        const TOTAL_TEST_ID = `customer_orders__element-card-price-${index + 1}`;
        const ADDRESS_TEST_ID = `customer_orders__element-card-address${index + 1}`;

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
        const onlyDateIndex = 10;
        const dateExpected = currentOrder.saleDate
          .toLocaleString()
          .substring(0, onlyDateIndex)
          .split('-').reverse()
          .join('/');

        expect(orderDate.textContent).toBe(dateExpected);
        expect(orderIndex.textContent).toBe(String(currentOrder.id));
        expect(orderStatus.textContent).toBe(currentOrder.status);
        expect(orderTotal.textContent).toBe(currentOrder.totalPrice.replace('.', ','));
      }
    });

    // eslint-disable-next-line max-len
    it('Redirects to the order details page when clicking one order (customer)', async () => {
      const { history } = renderWithRouterAndProvider(<App />, CUSTOMER_ORDERS_ENDPOINT);
      await waitFor(() => screen.getByTestId(FIRST_ORDER_TEST_ID));

      userEvent.click(screen.getByTestId(FIRST_ORDER_TEST_ID));

      expect(history.location.pathname).toBe('/customer/orders/1');
    });
  });
});
