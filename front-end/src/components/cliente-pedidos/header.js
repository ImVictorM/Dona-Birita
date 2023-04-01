import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../../context/Context';

function HeaderPedidos() {
  const history = useHistory();
  const { user } = useContext(Context);
  return (
    <header>
      <nav>
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
        <Link
          to="/"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </Link>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.removeItem('user');
            history.push('/');
          } }
        >
          Sair
        </button>
      </nav>
    </header>
  );
}

export default HeaderPedidos;
