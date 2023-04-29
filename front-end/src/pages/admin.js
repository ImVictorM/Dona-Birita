import AdminRegisterForm from '../components/admin/adminRegisterForm';
import Header from '../components/header/header';
import UserList from '../components/admin/userList';

function Admin() {
  return (
    <section>
      <Header />
      <AdminRegisterForm />
      <UserList />
    </section>
  );
}

export default Admin;
