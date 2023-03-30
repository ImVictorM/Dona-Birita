import PropTypes from 'prop-types';

function Card({ id, name, imag, price }) {
  return (
    <li>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ imag }
        alt={ name }
      />
      <p data-testid={ `customer_products__element-card-price-${id}` }>{ price }</p>
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
