import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './header.module.scss';

function Header() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className={ styles.header }>
      <nav className={ styles.header__nav }>
        <div>
          {
            user.role === 'customer' && (
              <Link
                to="/customer/products"
                data-testid="customer_products__element-navbar-link-products"
                className={ styles.header__nav__link }
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
                className={ styles.header__nav__link }
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
            className={ styles.header__nav__name }
          >
            { user.name }
          </span>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            className={ styles.header__nav__button }
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
