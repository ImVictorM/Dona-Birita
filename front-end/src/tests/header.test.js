import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './utils/renderOptions';
import { LOGGED_ADM, LOGGED_CUSTOMER, LOGGED_SELLER } from './mocks/userTypes.mock';
import Header from '../components/header/header';

const TEST_PREFIX = 'customer_products__';
const PRODUCTS_LINK_TEST_ID = `${TEST_PREFIX}element-navbar-link-products`;
const ORDERS_LINK_TEST_ID = `${TEST_PREFIX}element-navbar-link-orders`;
const USER_NAME_TEST_ID = `${TEST_PREFIX}element-navbar-link-orders`;
const LOGOUT_BUTTON_TEST_ID = `${TEST_PREFIX}element-navbar-link-logout`;
const ADM_NAME_TEST_ID = `${TEST_PREFIX}element-navbar-user-full-name`;

describe('Header component', () => {
  describe('Render', () => {
    afterEach(() => {
      localStorage.clear();
    });

    it('Renders the correct elements for customers', async () => {
      localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
      renderWithRouter(<Header />);

      expect(screen.getByTestId(PRODUCTS_LINK_TEST_ID)).toBeInTheDocument();
      expect(screen.getByTestId(ORDERS_LINK_TEST_ID)).toBeInTheDocument();
      expect(screen.getByTestId(USER_NAME_TEST_ID)).toBeInTheDocument();
      expect(screen.getByTestId(LOGOUT_BUTTON_TEST_ID)).toBeInTheDocument();
    });

    it('Renders the correct elements for sellers', async () => {
      localStorage.setItem('user', JSON.stringify(LOGGED_SELLER));
      renderWithRouter(<Header />);

      expect(screen.queryByTestId(PRODUCTS_LINK_TEST_ID)).not.toBeInTheDocument();
      expect(screen.getByTestId(ORDERS_LINK_TEST_ID)).toBeInTheDocument();
      expect(screen.getByTestId(USER_NAME_TEST_ID)).toBeInTheDocument();
      expect(screen.getByTestId(LOGOUT_BUTTON_TEST_ID)).toBeInTheDocument();
    });

    it('Renders the correct elements for adm', async () => {
      localStorage.setItem('user', JSON.stringify(LOGGED_ADM));
      renderWithRouter(<Header />);

      expect(screen.queryByTestId(PRODUCTS_LINK_TEST_ID)).not.toBeInTheDocument();
      expect(screen.queryByTestId(ORDERS_LINK_TEST_ID)).not.toBeInTheDocument();

      expect(screen.getByTestId(ADM_NAME_TEST_ID)).toBeInTheDocument();
      expect(screen.getByText(/gerenciar usuários/i)).toBeInTheDocument();

      expect(screen.getByTestId(LOGOUT_BUTTON_TEST_ID)).toBeInTheDocument();
    });
  });

  describe('Navigate', () => {
    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
    });

    it('Navigate to /customer/orders when clicking the order button', async () => {
      const { history } = renderWithRouter(<Header />);

      const ORDER_ENDPOINT = '/customer/orders';
      const ordersLink = screen.getByTestId(ORDERS_LINK_TEST_ID);

      userEvent.click(ordersLink);
      expect(history.location.pathname).toBe(ORDER_ENDPOINT);
    });

    it('Navigate to /customer/products when clicking the products button', async () => {
      const { history } = renderWithRouter(<Header />);
      const PRODUCTS_ENDPOINT = '/customer/products';
      const productsLink = screen.getByTestId(PRODUCTS_LINK_TEST_ID);

      userEvent.click(productsLink);
      expect(history.location.pathname).toBe(PRODUCTS_ENDPOINT);
    });

    it('Logout and navigate to /login when clicking the logout button', () => {
      const { history } = renderWithRouter(<Header />);

      const logoutButton = screen.getByTestId(LOGOUT_BUTTON_TEST_ID);

      userEvent.click(logoutButton);
      expect(history.location.pathname).toBe('/login');
      expect(JSON.parse(localStorage.getItem('user'))).toBeNull();
    });
  });
});
