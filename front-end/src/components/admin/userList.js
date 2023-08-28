import { useEffect, useContext } from 'react';
import { LoadingContext, UserContext } from '../../context/Context';
import styles from './userList.module.scss';
import Loading from '../loading/loading';

function UserList() {
  const { users, getUsersDifferentThanADM, deleteUser } = useContext(UserContext);
  const { isLoading, stopLoading, startLoading } = useContext(LoadingContext);

  useEffect(() => {
    async function fetchWithLoading() {
      await getUsersDifferentThanADM();
      stopLoading();
    }

    startLoading();
    fetchWithLoading();
  }, [getUsersDifferentThanADM, startLoading, stopLoading]);

  return (
    <section className={ styles.adm__users }>
      {
        !isLoading ? (
          <table className={ styles.adm__users__table }>
            <caption className={ styles.adm__users__table__title }>Usuários</caption>
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
                        data-cell="Índice"
                      >
                        <span>{ index + 1 }</span>

                      </td>
                      <td
                        data-cell="Nome"
                        data-testid={ `${TEST_PREFIX}name-${index}` }
                      >
                        <span>{name}</span>

                      </td>
                      <td
                        data-cell="E-mail"
                        data-testid={ `${TEST_PREFIX}email-${index}` }
                      >
                        <span>{email}</span>

                      </td>
                      <td
                        data-cell="Tipo"
                        data-testid={ `${TEST_PREFIX}role-${index}` }
                      >
                        <span>{role}</span>

                      </td>
                      <td
                        data-cell="Excluir"
                        data-testid={ `${TEST_PREFIX}remove-${index}` }
                      >
                        <button
                          onClick={ () => deleteUser(id) }
                          type="button"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        ) : (<Loading />)
      }

    </section>
  );
}

export default UserList;
