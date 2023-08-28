import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/Context';
import styles from './card.module.scss';

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
    const newValue = value <= 0 ? '' : Number(value);

    setQuantity(newValue);
    updateCart({ id, name, price, quantity: newValue });
  }

  function handleBlur({ target: { value } }) {
    if (value === '') {
      setQuantity(0);
      updateCart({ id, name, price, quantity: 0 });
    }
  }

  return (
    <li className={ styles.products__item }>
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
        className={ styles.products__item__name }
      >
        { name }

      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ imag }
        alt={ name }
        className={ styles.products__item__image }
      />
      <div className={ styles.products__item__price }>
        <span>R$: </span>
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { price.replace('.', ',') }
        </span>
      </div>
      <div className={ styles.products__item__quantity }>
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
          onBlur={ handleBlur }

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
