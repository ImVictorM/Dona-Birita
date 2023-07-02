/* eslint-disable react-func/max-lines-per-function */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProvider } from './utils/renderOptions';
import App from '../App';
import requestWithCORS from '../utils/requestWithCORS';

import {
  LOGGED_ADM,
  USERS_DIFFERENT_THAN_ADM,
} from './mocks/userTypes.mock';

import {
  CUSTOMER_TO_REGISTER,
  SELLER_TO_REGISTER,
} from './mocks/admin.mock';

const ADMIN_ENDPOINT = '/admin/manage';

const TEST_PREFIX = 'admin_manage__';
const NAME_INPUT_TEST_ID = `${TEST_PREFIX}input-name`;
const EMAIL_INPUT_TEST_ID = `${TEST_PREFIX}input-email`;
const PASSWORD_INPUT_TEST_ID = `${TEST_PREFIX}input-password`;
const ROLE_SELECT_TEST_ID = `${TEST_PREFIX}select-role`;
const REGISTER_BUTTON_TEST_ID = `${TEST_PREFIX}button-register`;
const ERROR_MESSAGE_TEST_ID = `${TEST_PREFIX}element-invalid-register`;

describe(`PATH: ${ADMIN_ENDPOINT} - Testing admin page`, () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(LOGGED_ADM));
    requestWithCORS.mockReturnValueOnce(USERS_DIFFERENT_THAN_ADM);

    renderWithRouterAndProvider(<App />, ADMIN_ENDPOINT);
    await waitFor(() => expect(requestWithCORS).toBeCalledTimes(1));
  });

  describe('Render', () => {
    it('Can render a form to register a user', () => {
      const nameInput = screen.queryByTestId(NAME_INPUT_TEST_ID);
      const emailInput = screen.queryByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.queryByTestId(PASSWORD_INPUT_TEST_ID);
      const roleSelect = screen.queryByTestId(ROLE_SELECT_TEST_ID);
      const registerButton = screen.queryByTestId(REGISTER_BUTTON_TEST_ID);

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(roleSelect).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();

      expect(roleSelect.length).toBe(2);
      expect(roleSelect.options[roleSelect.selectedIndex].value).toBe('customer');
      expect(roleSelect.options[roleSelect.selectedIndex].textContent).toBe('Cliente');

      userEvent.selectOptions(roleSelect, 'seller');
      expect(roleSelect.options[roleSelect.selectedIndex].textContent).toBe('Vendedor');
    });

    it('Can list all users different than administrator', () => {
      const usersTable = screen.getByRole('table');
      expect(usersTable.children.length).toBe(2);

      const USERS_IN_TABLE = {
        0: USERS_DIFFERENT_THAN_ADM[0],
        1: USERS_DIFFERENT_THAN_ADM[1],
      };

      for (let index = 0; index < usersTable.children.length; index += 1) {
        const ROW_INDEX_TEST_ID = `${TEST_PREFIX}element-user-table-item-number-${index}`;
        const ROW_NAME_TEST_ID = `${TEST_PREFIX}element-user-table-name-${index}`;
        const ROW_EMAIL_TEST_ID = `${TEST_PREFIX}element-user-table-email-${index}`;
        const ROW_ROLE_TEST_ID = `${TEST_PREFIX}element-user-table-role-${index}`;
        const ROW_DELETE_BTN_TEST_ID = `${TEST_PREFIX}element-user-table-remove-${index}`;

        expect(Number(screen.getByTestId(ROW_INDEX_TEST_ID).textContent)).toBe(index + 1);
        expect(screen.getByTestId(ROW_DELETE_BTN_TEST_ID)).toBeInTheDocument();

        expect(screen.getByTestId(ROW_NAME_TEST_ID).textContent)
          .toBe(USERS_IN_TABLE[index].name);
        expect(screen.getByTestId(ROW_EMAIL_TEST_ID).textContent)
          .toBe(USERS_IN_TABLE[index].email);
        expect(screen.getByTestId(ROW_ROLE_TEST_ID).textContent)
          .toBe(USERS_IN_TABLE[index].role);
      }
    });
  });

  describe('Management', () => {
    it('Can register a new customer user account', async () => {
      requestWithCORS.mockReturnValueOnce(undefined);
      const userListAfterRegister = [...USERS_DIFFERENT_THAN_ADM, CUSTOMER_TO_REGISTER];
      requestWithCORS.mockReturnValueOnce(userListAfterRegister);

      const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const roleSelect = screen.getByTestId(ROLE_SELECT_TEST_ID);
      const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

      userEvent.type(nameInput, CUSTOMER_TO_REGISTER.name);
      userEvent.type(emailInput, CUSTOMER_TO_REGISTER.email);
      userEvent.type(passwordInput, CUSTOMER_TO_REGISTER.password);
      userEvent.selectOptions(roleSelect, CUSTOMER_TO_REGISTER.role);

      expect(registerButton).toBeEnabled();
      userEvent.click(registerButton);

      await waitFor(() => {
        const createRow = screen
          .getByRole('cell', { name: CUSTOMER_TO_REGISTER.name }).closest('tr');

        const createdName = within(createRow)
          .queryByRole('cell', { name: CUSTOMER_TO_REGISTER.name });
        const createdEmail = within(createRow)
          .queryByRole('cell', { name: CUSTOMER_TO_REGISTER.email });
        const createdRole = within(createRow)
          .queryByRole('cell', { name: CUSTOMER_TO_REGISTER.role });

        expect(createdName).toBeInTheDocument();
        expect(createdEmail).toBeInTheDocument();
        expect(createdRole).toBeInTheDocument();
      });
    });

    it('Can register a new seller user account', async () => {
      requestWithCORS.mockReturnValueOnce(undefined);
      const userListAfterRegister = [...USERS_DIFFERENT_THAN_ADM, SELLER_TO_REGISTER];
      requestWithCORS.mockReturnValueOnce(userListAfterRegister);

      const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const roleSelect = screen.getByTestId(ROLE_SELECT_TEST_ID);
      const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

      userEvent.type(nameInput, SELLER_TO_REGISTER.name);
      userEvent.type(emailInput, SELLER_TO_REGISTER.email);
      userEvent.type(passwordInput, SELLER_TO_REGISTER.password);
      userEvent.selectOptions(roleSelect, SELLER_TO_REGISTER.role);

      expect(registerButton).toBeEnabled();
      userEvent.click(registerButton);

      await waitFor(() => {
        const createRow = screen
          .getByRole('cell', { name: SELLER_TO_REGISTER.name }).closest('tr');

        const createdName = within(createRow)
          .queryByRole('cell', { name: SELLER_TO_REGISTER.name });
        const createdEmail = within(createRow)
          .queryByRole('cell', { name: SELLER_TO_REGISTER.email });
        const createdRole = within(createRow)
          .queryByRole('cell', { name: SELLER_TO_REGISTER.role });

        expect(createdName).toBeInTheDocument();
        expect(createdEmail).toBeInTheDocument();
        expect(createdRole).toBeInTheDocument();
      });
    });

    it('Can\'t register a user that already exists', async () => {
      requestWithCORS.mockImplementationOnce(() => {
        throw new Error();
      });

      const EXISTING_USER = USERS_DIFFERENT_THAN_ADM[0];

      const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
      const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const roleSelect = screen.getByTestId(ROLE_SELECT_TEST_ID);
      const registerButton = screen.getByTestId(REGISTER_BUTTON_TEST_ID);

      userEvent.type(nameInput, EXISTING_USER.name);
      userEvent.type(emailInput, EXISTING_USER.email);
      userEvent.type(passwordInput, 'brandnewpassword');
      userEvent.selectOptions(roleSelect, EXISTING_USER.role);

      expect(registerButton).toBeEnabled();
      userEvent.click(registerButton);

      await waitFor(() => {
        const errorMessage = screen.queryByTestId(ERROR_MESSAGE_TEST_ID);
        const errorMessageContent = 'Nome ou e-mail já cadastrado!';
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.textContent).toBe(errorMessageContent);
      });
    });

    it('Can remove a user account', async () => {
      requestWithCORS.mockReturnValueOnce(undefined);
      requestWithCORS.mockReturnValueOnce([USERS_DIFFERENT_THAN_ADM[1]]);

      const FIRST_INDEX_TEST_ID = `${TEST_PREFIX}element-user-table-item-number-0`;
      const FIRST_NAME_TEST_ID = `${TEST_PREFIX}element-user-table-name-0`;
      const FIRST_EMAIL_TEST_ID = `${TEST_PREFIX}element-user-table-email-0`;
      const FIRST_ROLE_TEST_ID = `${TEST_PREFIX}element-user-table-role-0`;
      const FIRST_DELETE_BTN_TEST_ID = `${TEST_PREFIX}element-user-table-remove-0`;

      const firstUserIndex = screen.queryByTestId(FIRST_INDEX_TEST_ID);
      const firstUserName = screen.queryByTestId(FIRST_NAME_TEST_ID);
      const firstUserEmail = screen.queryByTestId(FIRST_EMAIL_TEST_ID);
      const firstUserRole = screen.queryByTestId(FIRST_ROLE_TEST_ID);
      const firstUserDeleteBtn = screen
        .queryByTestId(FIRST_DELETE_BTN_TEST_ID).firstChild;

      expect(firstUserIndex).toBeInTheDocument();
      expect(firstUserName).toBeInTheDocument();
      expect(firstUserEmail).toBeInTheDocument();
      expect(firstUserRole).toBeInTheDocument();
      expect(firstUserDeleteBtn).toBeInTheDocument();

      userEvent.click(firstUserDeleteBtn);

      await waitFor(() => {
        expect(firstUserIndex).not.toBeInTheDocument();
        expect(firstUserName).not.toBeInTheDocument();
        expect(firstUserEmail).not.toBeInTheDocument();
        expect(firstUserRole).not.toBeInTheDocument();
        expect(firstUserDeleteBtn).not.toBeInTheDocument();
      });
    });
  });
});
