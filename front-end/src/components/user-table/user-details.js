import React, { useEffect, useState } from 'react';
import './table.css';
import { useHistory } from 'react-router-dom';

function UserDetails() {
  const history = useHistory();
  const [getOrder, setOrder] = useState([]);
  const [seller, setSeller] = useState({});

  const getUrl = history.location.pathname;
  const CARACTER_NUMBER = 17;
  const getIdUrl = getUrl.substring(CARACTER_NUMBER);

  const CARACTER_DATA = 10;

  useEffect(() => {
    async function findUserById() {
      const response = await fetch(`http://localhost:3001/user/${2}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const dataSeller = await response.json();
      setSeller(dataSeller);
    }
    findUserById();
  }, []);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    async function fetchOrders() {
      const response = await fetch(`http://localhost:3001/customer/orders/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const test = data.filter((iten) => iten.id === Number(getIdUrl));
      setOrder(test);
    }
    fetchOrders();
  }, [getIdUrl, getOrder]);

  const dataTest = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <div className="improviso">
      <h1>Detalhes do produto</h1>
      {getOrder.map((iten) => (
        <div key={ iten.id }>
          <p
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { iten.id }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { seller.name }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { getOrder[0].saleDate.substring(0, CARACTER_DATA)
              .split('-').reverse().join('/') }
          </p>
          <p
            data-testid={ dataTest }
          >
            { getOrder[0].status }
          </p>
        </div>
      ))}
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
      >
        Check?

      </button>
      <p data-testid="customer_order_details__element-order-total-price">Total?</p>
    </div>
  );
}

export default UserDetails;
