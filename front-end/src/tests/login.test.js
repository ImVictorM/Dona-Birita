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

jest.mock('../utils/requestWithCORS');

const EMAIL_INPUT_TEST_ID = 'common_login__input-email';
const PASSWORD_INPUT_TEST_ID = 'common_login__input-password';
const LOGIN_BUTTON_TEST_ID = 'common_login__button-login';

describe('PATH: /login - Testing Login', () => {
  afterEach(() => {
    requestWithCORS.mockRestore();
  });

  it('Redirects to /login when the route is /', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/login');
  });

  it('Can login succesfully with correct information', async () => {
    requestWithCORS.mockReturnValue(LOGIN_RESPONSE);

    const { history } = renderWithRouter(<App />, '/login');

    expect(history.location.pathname).toBe('/login');

    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    userEvent.type(emailInput, VALID_CUSTOMER_EMAIL);
    userEvent.type(passwordInput, VALID_CUSTOMER_PASSWORD);

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(requestWithCORS).toHaveBeenCalled();
      expect(history.location.pathname).toBe('/customer/products');
    });
  });
});
