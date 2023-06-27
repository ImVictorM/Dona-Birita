import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './utils/renderOptions';
import requestWithCORS from '../utils/requestWithCORS';
import App from '../App';

import {
  LOGIN_RESPONSE,
  VALID_CUSTOMER_EMAIL,
  VALID_CUSTOMER_PASSWORD,
} from './mocks/login.mock';

const EMAIL_INPUT_TEST_ID = 'common_login__input-email';
const PASSWORD_INPUT_TEST_ID = 'common_login__input-password';
const LOGIN_BUTTON_TEST_ID = 'common_login__button-login';
const ERROR_MESSAGE_TEST_ID = 'common_login__element-invalid-email';
const REGISTER_BUTTON_TEST_ID = 'common_login__button-register';
const LOGIN_ENDPOINT = '/login';

describe('PATH: /login - Testing Login', () => {
  beforeEach(() => {
    requestWithCORS.mockClear();
    window.localStorage.clear();
  });

  describe('Redirects case', () => {
    it('Redirects to /login when the route is /', () => {
      const { history } = renderWithRouter(<App />);
      expect(history.location.pathname).toBe(LOGIN_ENDPOINT);
    });

    it('Redirects to /customer/products when user is already logged', () => {
      localStorage.setItem('user', JSON.stringify(LOGIN_RESPONSE)); // defines if the user is logged
      const { history } = renderWithRouter(<App />, LOGIN_ENDPOINT);
      expect(history.location.pathname).toBe('/customer/products');
    });

    it('Redirects to /register when clicking on the register button', () => {
      const { history } = renderWithRouter(<App />, LOGIN_ENDPOINT);
      const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

      userEvent.click(registerButton);

      expect(history.location.pathname).toBe('/register');
    });
  });

  describe('Login attempts', () => {
    it('Can login succesfully with correct information', async () => {
      requestWithCORS.mockReturnValue(LOGIN_RESPONSE);

      const { history } = renderWithRouter(<App />, LOGIN_ENDPOINT);

      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

      userEvent.type(emailInput, VALID_CUSTOMER_EMAIL);
      userEvent.type(passwordInput, VALID_CUSTOMER_PASSWORD);

      userEvent.click(loginButton);

      await waitFor(() => {
        expect(requestWithCORS).toHaveBeenCalled();
        expect(history.location.pathname).toBe('/customer/products');
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        expect(loggedUser).toEqual(LOGIN_RESPONSE);
      });
    });

    it('Shows an error message when login data isn\'t valid', async () => {
      requestWithCORS.mockImplementation(() => {
        throw new Error();
      });

      const { history } = renderWithRouter(<App />, LOGIN_ENDPOINT);

      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

      userEvent.type(emailInput, VALID_CUSTOMER_EMAIL);
      userEvent.type(passwordInput, 'invalidpassword');

      userEvent.click(loginButton);

      await waitFor(() => {
        expect(requestWithCORS).toHaveBeenCalled();
        expect(history.location.pathname).toBe(LOGIN_ENDPOINT);
        const errorMessage = screen.getByTestId(ERROR_MESSAGE_TEST_ID);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});
