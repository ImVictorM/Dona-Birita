import PropTypes from 'prop-types';
import './bubbles.css';

function Bubbles({ children }) {
  return (
    <div className="bubbles">
      { children }
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
    </div>
  );
}

Bubbles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Bubbles;
