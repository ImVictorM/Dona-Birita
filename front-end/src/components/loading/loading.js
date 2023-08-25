import React from 'react';
import loading from '../../images/loading.svg';
import styles from './loading.module.scss';

function Loading() {
  return (
    <div className={ styles.loading }>
      <img
        className={ styles.loading__image }
        src={ loading }
        alt="animated loading"
      />
    </div>
  );
}

export default Loading;
