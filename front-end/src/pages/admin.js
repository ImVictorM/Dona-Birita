import AdminForm from '../components/admin/adminForm';
import Header from '../components/header/header';
import UserList from '../components/admin/userList';

function Admin() {
  return (
    <section>
      <Header />
      <AdminForm />
      <UserList />
    </section>
  );
}

export default Admin;
