import PropTypes from 'prop-types';
import { useState, useMemo, useCallback } from 'react';
import { LoadingContext } from './Context';

function LoadingContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const startLoading = useCallback(() => {
    setIsLoading(() => true);
  }, []);

  const stopLoading = useCallback(() => {
    const TIMEOUT_TIME = 700;

    setTimeout(() => setIsLoading(() => false), TIMEOUT_TIME);
  }, []);

  const value = useMemo(() => ({
    startLoading,
    stopLoading,
    isLoading,
  }), [startLoading, stopLoading, isLoading]);

  return (
    <LoadingContext.Provider value={ value }>
      {children}
    </LoadingContext.Provider>
  );
}

LoadingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingContextProvider;
