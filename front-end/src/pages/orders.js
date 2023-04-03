import SellerTable from '../components/seller-table/table';
import UserTable from '../components/user-table/table';

function CustomerOrders() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  console.log(role);
  return (
    (role === 'seller' ? <SellerTable /> : <UserTable />)
  );
}

export default CustomerOrders;
