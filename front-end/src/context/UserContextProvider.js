import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { UserContext } from './Context';

function UserContextProvider({ children }) {
  const valueToProvide = useMemo(() => ({

  }), []);

  return (
    <UserContext.Provider value={ valueToProvide }>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
