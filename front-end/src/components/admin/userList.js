import { useEffect, useState } from 'react';
import requestWithCORS from '../../utils/requestWithCORS';
import { GET_USER_LIST } from '../../utils/backendEndpoints';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUserList() {
      const userListFromDB = await requestWithCORS(GET_USER_LIST);
      setUsers(userListFromDB);
    }

    getUserList();
  }, []);

  async function deleteUser(id) {
    const options = {
      endpoint: `http://localhost:3001/admin/user/${id}`,
      method: 'DELETE',
    };
    const auth = JSON.parse(localStorage.getItem('user')).token;
    await requestWithCORS(options, null, auth);
  }

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Índice</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              const { name, email, role, id } = user;
              const TEST_PREFIX = 'admin_manage__element-user-table-';
              return (
                <tr key={ id }>
                  <td
                    data-testid={ `${TEST_PREFIX}item-number-${index}` }
                  >
                    { index + 1 }

                  </td>
                  <td data-testid={ `${TEST_PREFIX}name-${index}` }>{name}</td>
                  <td data-testid={ `${TEST_PREFIX}email-${index}` }>{email}</td>
                  <td data-testid={ `${TEST_PREFIX}role-${index}` }>{role}</td>
                  <td data-testid={ `${TEST_PREFIX}remove-${index}` }>
                    <button
                      onClick={ () => deleteUser(id) }
                      type="button"
                    >
                      Exclui
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </section>
  );
}

export default UserList;
