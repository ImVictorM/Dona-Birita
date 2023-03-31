import PropTypes from 'prop-types';
import { useState } from 'react';

function Card({ id, name, imag, price }) {
  const [quantity, setQuantity] = useState(0);
  function handleClickAdd() {
    const result = quantity + 1;
    setQuantity(result);
  }

  function handleClickMinus() {
    const result = quantity - 1;
    setQuantity(result);
  }
  return (
    <li>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ imag }
        alt={ name }
      />
      <p data-testid={ `customer_products__element-card-price-${id}` }>{ price }</p>
      <button
        type="button"
        onClick={ handleClickMinus }
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
        onClick={ handleClickAdd }
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
