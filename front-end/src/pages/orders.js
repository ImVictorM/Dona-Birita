import Header from '../components/header/header';
import SellerTable from '../components/seller-table/table';
import UserTable from '../components/user-table/table';

function Orders() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header />
      {role === 'seller' ? <SellerTable /> : <UserTable />}
    </div>
  );
}

export default Orders;
