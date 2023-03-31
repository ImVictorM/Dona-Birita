import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Card({ id, name, imag, price }) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (quantity > 0) {
      const INVALID_INDEX = -1;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      const indexToUpdate = cart.findIndex((product) => product.id === id);

      if (indexToUpdate !== INVALID_INDEX) {
        cart[indexToUpdate].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        const newProduct = { id, name, imag, price, quantity };
        localStorage.setItem('cart', JSON.stringify([...cart, newProduct]));
      }
    }
  }, [id, imag, name, price, quantity]);

  function handleClickAdd() {
    setQuantity(quantity + 1);
  }

  function handleClickMinus() {
    setQuantity(quantity - 1);
  }
  return (
    <li>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ imag }
        alt={ name }
      />
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <button
        type="button"
        onClick={ () => handleClickMinus() }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -

      </button>
      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        name="quantidade"
        value={ quantity }
      />
      <button
        type="button"
        onClick={ () => handleClickAdd() }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +

      </button>
    </li>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imag: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Card;
