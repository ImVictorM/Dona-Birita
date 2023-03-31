import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Card({ id, name, imag, price }) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (quantity > 0) {
      const INVALID_INDEX = -1;
      const indexToUpdate = cart.findIndex((product) => product.productId === id);

      if (indexToUpdate !== INVALID_INDEX) {
        const subTotal = quantity * price;
        cart[indexToUpdate].quantity = quantity;
        cart[indexToUpdate].subTotal = subTotal.toString().replace('.', ',');
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        const subTotal = price * quantity;
        const newProduct = {
          productId: id,
          name,
          unitPrice: price.replace('.', ','),
          quantity,
          subTotal: subTotal.toString().replace('.', ','),
        };
        localStorage.setItem('cart', JSON.stringify([...cart, newProduct]));
      }
    } else {
      const updatedCart = cart.filter((product) => product.productId !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }, [id, imag, name, price, quantity]);

  function handleClickAdd() {
    setQuantity(quantity + 1);
  }

  function handleClickMinus() {
    if (quantity <= 0) return setQuantity(0);
    setQuantity(quantity - 1);
  }

  function handleChangeQuantity({ target: { value } }) {
    if (value <= 0) return setQuantity(0);
    setQuantity(value);
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
        onChange={ handleChangeQuantity }

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
