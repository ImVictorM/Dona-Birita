import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './header.css';

function Header() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <header className="main-header">
      <nav>
        <div>
          {
            user.role === 'customer' && (
              <Link
                to="/customer/products"
                data-testid="customer_products__element-navbar-link-products"
              >
                Produtos
              </Link>
            )
          }
          {
            user.role !== 'administrator' ? (
              <Link
                to={ `/${user.role}/orders` }
                data-testid="customer_products__element-navbar-link-orders"
              >
                { user.role === 'customer' ? 'Meus Pedidos' : 'Pedidos' }
              </Link>

            ) : (
              <p>Gerenciar Usuários</p>
            )
          }

        </div>
        <div>
          <span
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user.name }
          </span>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => {
              localStorage.clear();
              history.push('/login');
            } }
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
