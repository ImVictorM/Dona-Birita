import AdminRegisterForm from '../components/admin/adminRegisterForm';
import Header from '../components/header/header';
import UserList from '../components/admin/userList';

function Admin() {
  return (
    <>
      <Header />
      <main>
        <AdminRegisterForm />
        <UserList />
      </main>
    </>
  );
}

export default Admin;
