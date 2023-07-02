import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './utils/renderOptions';
import App from '../App';
import requestWithCORS from '../utils/requestWithCORS';

import {
  VALID_CUSTOMER_REGISTER_RESPONSE,
  VALID_CUSTOMER_TO_REGISTER,
} from './mocks/register.mock';

const REGISTER_ENDPOINT = '/register';

const TEST_PREFIX = 'common_register__';
const NAME_INPUT_TEST_ID = `${TEST_PREFIX}input-name`;
const EMAIL_INPUT_TEST_ID = `${TEST_PREFIX}input-email`;
const PASSWORD_INPUT_TEST_ID = `${TEST_PREFIX}input-password`;
const REGISTER_BUTTON_TEST_ID = `${TEST_PREFIX}button-register`;
const ERROR_MESSAGE_TEST_ID = `${TEST_PREFIX}element-invalid_register`;
const GO_BACK_BUTTON_TEST_ID = `${TEST_PREFIX}button-go-back`;

describe(`PATH: ${REGISTER_ENDPOINT} - Testing register`, () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('Testing register inputs', () => {
    it('Is enabled to register with name greater or equal to 12 characters', () => {
      renderWithRouter(<App />, REGISTER_ENDPOINT);

      const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

      userEvent.type(nameInput, 'a');
      userEvent.type(emailInput, VALID_CUSTOMER_TO_REGISTER.email);
      userEvent.type(passwordInput, VALID_CUSTOMER_TO_REGISTER.password);
      expect(registerButton).not.toBeEnabled();

      userEvent.clear(nameInput);
      userEvent.type(nameInput, 'abcdefghijk'); // 11 characters

      expect(registerButton).not.toBeEnabled();

      userEvent.type(nameInput, 'k');
      expect(registerButton).toBeEnabled();
    });

    it('Is enabled to register with valid email format', () => {
      renderWithRouter(<App />, REGISTER_ENDPOINT);

      const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

      userEvent.type(nameInput, VALID_CUSTOMER_TO_REGISTER.name);
      userEvent.type(passwordInput, VALID_CUSTOMER_TO_REGISTER.password);

      userEvent.type(emailInput, 'email.com');
      expect(registerButton).not.toBeEnabled();

      userEvent.clear(emailInput);
      userEvent.type(emailInput, 'email@email');
      expect(registerButton).not.toBeEnabled();

      userEvent.clear(emailInput);
      userEvent.type(emailInput, VALID_CUSTOMER_TO_REGISTER.email);
      expect(registerButton).toBeEnabled();
    });

    it('Is enabled to register with password greater or equal to 6 characters', () => {
      renderWithRouter(<App />, REGISTER_ENDPOINT);

      const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

      userEvent.type(nameInput, VALID_CUSTOMER_TO_REGISTER.name);
      userEvent.type(emailInput, VALID_CUSTOMER_TO_REGISTER.email);
      userEvent.type(passwordInput, 'a');
      expect(registerButton).not.toBeEnabled();

      userEvent.type(passwordInput, 'Kf83D');
      expect(registerButton).toBeEnabled();
    });
  });

  describe('Register attempts', () => {
    it('Can register a new user succesfully', async () => {
      requestWithCORS.mockReturnValue(VALID_CUSTOMER_REGISTER_RESPONSE);

      const { history } = renderWithRouter(<App />, REGISTER_ENDPOINT);

      const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

      userEvent.type(nameInput, VALID_CUSTOMER_TO_REGISTER.name);
      userEvent.type(emailInput, VALID_CUSTOMER_TO_REGISTER.email);
      userEvent.type(passwordInput, VALID_CUSTOMER_TO_REGISTER.password);

      const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

      expect(registerButton).toBeEnabled();
      userEvent.click(registerButton);

      await waitFor(() => {
        expect(requestWithCORS).toHaveBeenCalled();
        expect(history.location.pathname).toBe('/customer/products');
        const registeredUser = JSON.parse(localStorage.getItem('user'));
        expect(registeredUser).toEqual(VALID_CUSTOMER_REGISTER_RESPONSE);
      });
    });

    it('Shows an error message when user already exists', async () => {
      requestWithCORS.mockImplementation(() => {
        throw new Error();
      });

      const { history } = renderWithRouter(<App />, REGISTER_ENDPOINT);

      const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

      userEvent.type(nameInput, VALID_CUSTOMER_TO_REGISTER.name);
      userEvent.type(emailInput, VALID_CUSTOMER_TO_REGISTER.email);
      userEvent.type(passwordInput, VALID_CUSTOMER_TO_REGISTER.password);

      const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

      userEvent.click(registerButton);

      await waitFor(() => {
        expect(requestWithCORS).toHaveBeenCalled();
        expect(history.location.pathname).toBe(REGISTER_ENDPOINT);
        const errorMessage = screen.getByTestId(ERROR_MESSAGE_TEST_ID);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe('Redirects case', () => {
    it('Come back to /login when clicking the go back button', () => {
      const { history } = renderWithRouter(<App />, REGISTER_ENDPOINT);

      const goBackButton = screen.getByTestId(GO_BACK_BUTTON_TEST_ID);

      userEvent.click(goBackButton);

      expect(history.location.pathname).toBe('/login');
    });
  });
});
