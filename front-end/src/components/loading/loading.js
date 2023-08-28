import React from 'react';
import loading from '../../images/loading.svg';
import styles from './loading.module.scss';

function Loading() {
  return (
    <div className={ styles.loading }>
      <img
        src={ loading }
        alt="animated loading"
        data-testid="loading-img"
      />
    </div>
  );
}

export default Loading;
