import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from './Context';
import { POST_USER_LOGIN } from '../utils/backendEndpoints';
import requestWithCORS from '../utils/requestWithCORS';

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

  async function loginUser(userInfo) {
    const responseLogin = await requestWithCORS(POST_USER_LOGIN, 'POST', userInfo);
    if (responseLogin.message) {
      throw new Error('Bad Request');
    }
    localStorage.setItem('user', JSON.stringify(responseLogin));
    return responseLogin;
  }

  const value = useMemo(() => ({
    handleStatus,
    statusSales,
    setStatusSales,
    loginUser,
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
