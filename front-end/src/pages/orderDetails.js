import React from 'react';
import Header from '../components/header/header';
import SellerDetails from '../components/seller-table/seller-details';
import UserDetails from '../components/user-table/user-details';

function OrderDetails() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header />
      {role === 'seller' ? <SellerDetails /> : <UserDetails />}
    </div>
  );
}

export default OrderDetails;
