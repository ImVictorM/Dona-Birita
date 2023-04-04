import HeaderPedidos from '../components/cliente-pedidos/header';
import SellerTable from '../components/seller-table/table';
import UserTable from '../components/user-table/table';

function CustomerOrders() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  console.log(role);
  return (
    <div>
      <HeaderPedidos />
      {role === 'seller' ? <SellerTable /> : <UserTable />}
    </div>
  );
}

export default CustomerOrders;
