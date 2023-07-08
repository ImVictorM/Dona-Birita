import PropTypes from 'prop-types';
import style from './bubbles.module.scss';

function Bubbles({ children }) {
  return (
    <div className={ style.beer_bg }>
      <div className={ style.bubbles }>
        { children }
        <div className={ style.bubble } />
        <div className={ style.bubble } />
        <div className={ style.bubble } />
        <div className={ style.bubble } />
        <div className={ style.bubble } />
        <div className={ style.bubble } />
        <div className={ style.bubble } />
        <div className={ style.bubble } />
        <div className={ style.bubble } />
        <div className={ style.bubble } />
      </div>
    </div>
  );
}

Bubbles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Bubbles;
