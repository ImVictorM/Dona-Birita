import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({});

  const value = useMemo(() => ({
    totalPrice,
    setTotalPrice,
    user,
    setUser,
  }), [totalPrice, user]);

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
