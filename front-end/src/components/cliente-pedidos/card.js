import PropTypes from 'prop-types';
import { useState } from 'react';

function Card({ id, name, imag, price }) {
  const [quantity, setQuantity] = useState(0);
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const cartFromLocalStorage = localStorage.getItem('cart');

  //   if (cartFromLocalStorage) {
  //     setCart(JSON.parse(cartFromLocalStorage));
  //     console.log('set cart', cart);
  //     const indexToIncrease = cart.findIndex((product) => product.id === id);
  //     console.log('index', indexToIncrease);
  //     const NULL_INDEX = -1;
  //     if (indexToIncrease === NULL_INDEX) {
  //       console.log('teste', cart[indexToIncrease]);
  //       // cart[indexToIncrease].quantity = quantity;
  //       localStorage.setItem('cart', JSON.stringify(cart));
  //     }
  //   } else {
  //     const product = { id, name, imag, price, quantity };
  //     console.log('product', product);
  //     setCart([product]);
  //     console.log(cart);
  //     localStorage.setItem('cart', JSON.stringify(cart));
  //   }
  // }, [quantity]);

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
