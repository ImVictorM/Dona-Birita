import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import '../cliente-pedidos/header.css';

function HeaderSeller() {
  const history = useHistory();
  const { user } = useContext(Context);
  return (
    <header className="main-header">
      <nav>
        <div>
          <Link
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        </div>
        <div>
          <span
            to="/"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user.name }
          </span>
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
        </div>
      </nav>
    </header>
  );
}

export default HeaderSeller;
