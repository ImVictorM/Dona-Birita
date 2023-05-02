import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/Context';
import './card.css';

function Card({ id, name, imag, price }) {
  const [quantity, setQuantity] = useState(undefined);
  const { updateCart, cart } = useContext(CartContext);

  useState(() => {
    const product = cart.find((p) => p.productId === id) || {};
    setQuantity(product.quantity || 0);
  });

  function handleClickAdd() {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart({ id, name, price, quantity: newQuantity });
  }

  function handleClickMinus() {
    const newQuantity = quantity - 1;
    if (quantity > 0) {
      setQuantity(newQuantity);
      updateCart({ id, name, price, quantity: newQuantity });
    }
  }

  function handleChangeQuantity({ target: { value } }) {
    if (value > 0) {
      setQuantity(Number(value));
      updateCart({ id, name, price, quantity: value });
    }
  }

  return (
    <li className="card">
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ imag }
        alt={ name }
      />
      <div className="price-container">
        <span>R$: </span>
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { price.replace('.', ',') }
        </span>
      </div>
      <div className="quantity-container">
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
          onChange={ handleChangeQuantity }

        />
        <button
          type="button"
          onClick={ handleClickAdd }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +

        </button>
      </div>
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
