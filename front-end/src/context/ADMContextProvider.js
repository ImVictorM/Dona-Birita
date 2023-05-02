import PropTypes from 'prop-types';
import { useMemo, useState, useCallback } from 'react';
import { UserContext } from './Context';
import requestWithCORS from '../utils/requestWithCORS';
import { GET_USER_LIST, ADMIN_POST_USER_REGISTER } from '../utils/backendEndpoints';

function ADMContextProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsersDifferentThanADM = useCallback(async () => {
    const userListFromDB = await requestWithCORS(GET_USER_LIST);
    setUsers(userListFromDB);
  }, []);

  const deleteUser = useCallback(async (id) => {
    const options = {
      endpoint: `http://localhost:3001/admin/user/${id}`,
      method: 'DELETE',
    };
    const auth = JSON.parse(localStorage.getItem('user')).token;
    await requestWithCORS(options, null, auth);
    getUsersDifferentThanADM();
  }, [getUsersDifferentThanADM]);

  const registerNewUser = useCallback(async (userToRegister, authorization) => {
    await requestWithCORS(
      ADMIN_POST_USER_REGISTER,
      userToRegister,
      authorization,
    );
    getUsersDifferentThanADM();
  }, [getUsersDifferentThanADM]);

  const valueToProvide = useMemo(() => ({
    users,
    deleteUser,
    getUsersDifferentThanADM,
    registerNewUser,
  }), [deleteUser, getUsersDifferentThanADM, registerNewUser, users]);

  return (
    <UserContext.Provider value={ valueToProvide }>
      {children}
    </UserContext.Provider>
  );
}

ADMContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ADMContextProvider;
