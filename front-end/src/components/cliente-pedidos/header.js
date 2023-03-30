import { Link } from 'react-router-dom';

function HeaderPedidos() {
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
        />
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}

export default HeaderPedidos;
