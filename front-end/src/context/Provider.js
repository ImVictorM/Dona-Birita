import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from './Context';

function Provider({ children }) {
  const [statusSales, setStatusSales] = useState('');
  const contentType = 'application/json';

  async function handleStatus(status, id) {
    await fetch(`http://localhost:3001/sale/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': contentType,
      },
      body: JSON.stringify({ status }),
    });
    setStatusSales(status);
  }

  const value = useMemo(() => ({
    handleStatus,
    statusSales,
    setStatusSales,

  }), [statusSales]);

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
