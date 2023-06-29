import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import requestWithCORS from '../utils/requestWithCORS';
import { renderWithRouterAndProvider } from './utils/renderOptions';
import App from '../App';
import PRODUCT_LIST from './mocks/products.mock';

import { LOGGED_CUSTOMER } from './mocks/userTypes.mock';

const PRODUCTS_ENDPOINT = '/customer/products';

const CART_BTN_TEST_ID = 'customer_products__button-cart';
const CART_TOTAL_TEST_ID = 'customer_products__checkout-bottom-value';

describe('PATH: /customer/products - Testing products', () => {
  beforeEach(async () => {
    requestWithCORS.mockReturnValue(PRODUCT_LIST);
    localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
    localStorage.setItem('cart', JSON.stringify([]));

    renderWithRouterAndProvider(<App />, PRODUCTS_ENDPOINT);
    const FIRST_PRODUCTS_TEST_ID = 'customer_products__element-card-title-1';
    await waitFor(() => screen.queryByTestId(FIRST_PRODUCTS_TEST_ID));
  });

  describe('Render', () => {
    it('Renders all the products correctly', () => {
      const PRODUCT_LIST_TEST_ID = 'customer_product_list';
      const products = screen.queryByTestId(PRODUCT_LIST_TEST_ID).children;
      expect(products.length).toBe(PRODUCT_LIST.length);

      for (let index = 0; index < products.length; index += 1) {
        const TITLE_TEST_ID = `customer_products__element-card-title-${index + 1}`;
        const IMAGE_TEST_ID = `customer_products__img-card-bg-image-${index + 1}`;
        const PRICE_TEST_ID = `customer_products__element-card-price-${index + 1}`;

        expect(screen.queryByTestId(TITLE_TEST_ID).textContent)
          .toBe(PRODUCT_LIST[index].name);
        expect(screen.queryByTestId(IMAGE_TEST_ID).src)
          .toBe(PRODUCT_LIST[index].urlImage);
        expect(screen.queryByTestId(PRICE_TEST_ID).textContent)
          .toBe(PRODUCT_LIST[index].price.replace('.', ','));
      }
    });

    it('Renders the cart button correctly', () => {
      expect(screen.queryByTestId(CART_BTN_TEST_ID)).toBeDisabled();
      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent).toBe('0,00');
    });
  });

  describe('Functionalities', () => {
    it('Is possible to add and remove products from the cart correctly', () => {
      const REMOVE_1_TEST_ID = 'customer_products__button-card-rm-item-1';

      const ADD_1_TEST_ID = 'customer_products__button-card-add-item-1';
      const ADD_2_TEST_ID = 'customer_products__button-card-add-item-2';
      const ADD_3_TEST_ID = 'customer_products__button-card-add-item-3';

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
      const P1_QUANTITY_INPUT_TEST_ID = 'customer_products__input-card-quantity-1';
      const quantityInput = screen.getByTestId(P1_QUANTITY_INPUT_TEST_ID);
      const DESIRED_QUANTITY = 3;
      userEvent.type(quantityInput, String(DESIRED_QUANTITY));
      const total = Number(PRODUCT_LIST[0].price) * DESIRED_QUANTITY;

      expect(screen.getByTestId(CART_TOTAL_TEST_ID).textContent)
        .toBe(total.toFixed(2).replace('.', ','));
    });
  });
});

describe('Redirect', () => {
  beforeEach(async () => {
    requestWithCORS.mockReturnValue(PRODUCT_LIST);
    localStorage.setItem('user', JSON.stringify(LOGGED_CUSTOMER));
    localStorage.setItem('cart', JSON.stringify([]));
  });

  it('Redirects to the checkout page when clicking on the cart button', async () => {
    const { history } = renderWithRouterAndProvider(<App />, PRODUCTS_ENDPOINT);
    const FIRST_PRODUCTS_TEST_ID = 'customer_products__element-card-title-1';
    await waitFor(() => screen.queryByTestId(FIRST_PRODUCTS_TEST_ID));

    const ADD_1_TEST_ID = 'customer_products__button-card-add-item-1';
    userEvent.click(screen.getByTestId(ADD_1_TEST_ID));

    const cartButton = screen.getByTestId(CART_BTN_TEST_ID);
    expect(cartButton).toBeEnabled();

    userEvent.click(cartButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/checkout');
    });
  });
});
