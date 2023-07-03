import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import requestWithCORS from '../utils/requestWithCORS';
import { renderWithRouterAndProvider } from './utils/renderOptions';
import App from '../App';
import { PRODUCT_LIST, PRODUCTS_IN_CART } from './mocks/products.mock';

import { LOGGED_CUSTOMER } from './mocks/userTypes.mock';

const PRODUCTS_ENDPOINT = '/customer/products';

const TEST_PREFIX = 'customer_products__';
const CART_BTN_TEST_ID = `${TEST_PREFIX}button-cart`;
const CART_TOTAL_TEST_ID = `${TEST_PREFIX}checkout-bottom-value`;
const FIRST_PRODUCT_TEST_ID = `${TEST_PREFIX}element-card-title-1`;
const PRODUCT_1_INPUT_TEST_ID = `${TEST_PREFIX}input-card-quantity-1`;
const PRODUCT_2_INPUT_TEST_ID = `${TEST_PREFIX}input-card-quantity-2`;
const PRODUCT_3_INPUT_TEST_ID = `${TEST_PREFIX}input-card-quantity-3`;

describe(`PATH: ${PRODUCTS_ENDPOINT} - Testing products`, () => {
  beforeEach(async () => {
    requestWithCORS.mockReturnValue(PRODUCT_LIST);
    localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
    localStorage.setItem('cart', JSON.stringify([]));
  });

  describe('Render', () => {
    it('Renders all the products correctly', async () => {
      renderWithRouterAndProvider(<App />, PRODUCTS_ENDPOINT);
      await waitFor(() => screen.queryByTestId(FIRST_PRODUCT_TEST_ID));

      const PRODUCT_LIST_TEST_ID = 'customer_product_list';
      const products = screen.queryByTestId(PRODUCT_LIST_TEST_ID).children;
      expect(products.length).toBe(PRODUCT_LIST.length);

      for (let index = 0; index < products.length; index += 1) {
        const TITLE_TEST_ID = `${TEST_PREFIX}element-card-title-${index + 1}`;
        const IMAGE_TEST_ID = `${TEST_PREFIX}img-card-bg-image-${index + 1}`;
        const PRICE_TEST_ID = `${TEST_PREFIX}element-card-price-${index + 1}`;

        expect(screen.queryByTestId(TITLE_TEST_ID).textContent)
          .toBe(PRODUCT_LIST[index].name);
        expect(screen.queryByTestId(IMAGE_TEST_ID).src)
          .toBe(PRODUCT_LIST[index].urlImage);
        expect(screen.queryByTestId(PRICE_TEST_ID).textContent)
          .toBe(PRODUCT_LIST[index].price.replace('.', ','));
      }
    });

    it('Renders the cart button correctly', async () => {
      renderWithRouterAndProvider(<App />, PRODUCTS_ENDPOINT);
      await waitFor(() => screen.queryByTestId(FIRST_PRODUCT_TEST_ID));

      expect(screen.queryByTestId(CART_BTN_TEST_ID)).toBeDisabled();
      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent).toBe('0,00');
    });

    it('Renders product with correct quantity when product already in cart', async () => {
      localStorage.setItem('cart', JSON.stringify(PRODUCTS_IN_CART));
      renderWithRouterAndProvider(<App />, PRODUCTS_ENDPOINT);
      await waitFor(() => screen.queryByTestId(FIRST_PRODUCT_TEST_ID));

      const productOneInput = screen.getByTestId(PRODUCT_1_INPUT_TEST_ID);
      const productTwoInput = screen.getByTestId(PRODUCT_2_INPUT_TEST_ID);
      const productThreeInput = screen.getByTestId(PRODUCT_3_INPUT_TEST_ID);

      expect(productOneInput.value).toBe('2');
      expect(productTwoInput.value).toBe('1');
      expect(productThreeInput.value).toBe('0');
    });
  });

  describe('Redirect', () => {
    it('Redirects to the checkout page when clicking on the cart button', async () => {
      const { history } = renderWithRouterAndProvider(<App />, PRODUCTS_ENDPOINT);
      await waitFor(() => screen.queryByTestId(FIRST_PRODUCT_TEST_ID));

      const ADD_1_TEST_ID = `${TEST_PREFIX}button-card-add-item-1`;
      userEvent.click(screen.getByTestId(ADD_1_TEST_ID));

      const cartButton = screen.getByTestId(CART_BTN_TEST_ID);
      expect(cartButton).toBeEnabled();

      userEvent.click(cartButton);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/checkout');
      });
    });
  });

  describe('Functionalities', () => {
    beforeEach(async () => {
      renderWithRouterAndProvider(<App />, PRODUCTS_ENDPOINT);
      await waitFor(() => screen.queryByTestId(FIRST_PRODUCT_TEST_ID));
    });

    it('Is possible to add and remove products from the cart correctly', () => {
      const REMOVE_1_TEST_ID = `${TEST_PREFIX}button-card-rm-item-1`;

      const ADD_1_TEST_ID = `${TEST_PREFIX}button-card-add-item-1`;
      const ADD_2_TEST_ID = `${TEST_PREFIX}button-card-add-item-2`;
      const ADD_3_TEST_ID = `${TEST_PREFIX}button-card-add-item-3`;

      userEvent.click(screen.getByTestId(ADD_1_TEST_ID));
      userEvent.click(screen.getByTestId(ADD_2_TEST_ID));
      userEvent.click(screen.getByTestId(ADD_3_TEST_ID));

      const total = PRODUCT_LIST.reduce((acc, curr) => Number(curr.price) + acc, 0);
      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent)
        .toBe(String(total).replace('.', ','));

      userEvent.click(screen.getByTestId(REMOVE_1_TEST_ID));
      const newTotalAfterRemove = (total - Number(PRODUCT_LIST[0].price));
      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent)
        .toBe(newTotalAfterRemove.toFixed(2).replace('.', ','));

      userEvent.click(screen.getByTestId(ADD_3_TEST_ID));
      const newTotalAfterAdd = (newTotalAfterRemove + Number(PRODUCT_LIST[2].price));
      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent)
        .toBe(newTotalAfterAdd.toFixed(2).replace('.', ','));
    });

    it('Is possible to change the product quantity manually', () => {
      const quantityInput = screen.getByTestId(PRODUCT_1_INPUT_TEST_ID);
      const DESIRED_QUANTITY = 3;

      userEvent.clear(quantityInput);
      userEvent.type(quantityInput, String(DESIRED_QUANTITY));
      userEvent.click(document.body); // activate onBlur

      expect(quantityInput.value).toBe(String(DESIRED_QUANTITY));

      const total = Number(PRODUCT_LIST[0].price) * DESIRED_QUANTITY;

      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent)
        .toBe(total.toFixed(2).replace('.', ','));
    });

    it('Is not possible to add a negative quantity to the cart', () => {
      const P1_MINUS_BTN_TEST_ID = `${TEST_PREFIX}button-card-rm-item-1`;
      const CART_EMPTY_TOTAL = '0,00';

      const minusBtn = screen.getByTestId(P1_MINUS_BTN_TEST_ID);
      const quantityInput = screen.getByTestId(PRODUCT_1_INPUT_TEST_ID);

      userEvent.clear(quantityInput);
      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent).toBe(CART_EMPTY_TOTAL);

      userEvent.type(quantityInput, '-4');
      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent).toBe(CART_EMPTY_TOTAL);

      userEvent.click(minusBtn);
      userEvent.click(minusBtn);
      userEvent.click(minusBtn);

      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent).toBe(CART_EMPTY_TOTAL);
    });
  });
});
