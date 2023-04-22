import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/Context';

function UserDetails() {
  const history = useHistory();
  const { handleStatus, statusSales, setStatusSales } = useContext(Context);
  const [getOrder, setOrder] = useState([]);
  const [seller, setSeller] = useState({});
  const [getCart, setCart] = useState([]);
  // const [statusSales, setStatusSales] = useState('');

  const contentTypes = 'application/json';

  const getUrl = history.location.pathname;
  const CARACTER_NUMBER = 17;
  const getIdUrl = getUrl.substring(CARACTER_NUMBER);

  const CARACTER_DATA = 10;

  // function getLocalStorage() {
  //   const cart = JSON.parse(localStorage.getItem('cart'));
  //   setCart(cart);
  // }

  const contentType = 'application/json';

  useEffect(() => {
    async function findUserById() {
      if (getOrder.length > 0 && getOrder[0].sellerId) {
        const response = await fetch(`http://localhost:3001/user/id/${getOrder[0].sellerId}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': contentType,
          },
        });
        const dataSeller = await response.json();
        setSeller(dataSeller);
      }
    }
    findUserById();
  }, [getOrder, setOrder]);

  function updateProducts([{ products }]) {
    setCart(products);
  }

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch(`http://localhost:3001/product/${Number(getIdUrl)}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': contentTypes,
        },
      });
      const data = await response.json();
      console.log('REQUISIÇÃO QUE não existia', data);

      updateProducts(data);
      setStatusSales(data[0].status);
      setOrder(data);
    }
    fetchOrders();
  }, []);

  // useEffect(() => {
  //   const { id } = JSON.parse(localStorage.getItem('user'));
  //   async function fetchOrders() {
  //     const response = await fetch(`http://localhost:3001/customer/orders/${id}`, {
  //       method: 'GET',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': contentType,
  //       },
  //     });
  //     const data = await response.json();
  //     const test = data.filter((iten) => iten.id === Number(getIdUrl));
  //     console.log('REQUISIÇÃO QUE JÁ EXISTIA', test);
  //     setOrder(test);
  //     setStatusSales(test[0].status);
  //   }
  //   fetchOrders();
  //   getLocalStorage();
  // }, []);

  const dataTest = 'customer_order_details__element-order-details-label-delivery-status';
  console.log('teste', getCart);

  return (
    <div className="improviso">
      <h1>Detalhes do produto</h1>
      {getOrder ? getOrder.map((iten) => (
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
            { statusSales }
          </p>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ statusSales !== 'Em Trânsito' }
            onClick={ () => handleStatus('Entregue', getIdUrl) }
          >
            MARCAR COMO ENTREGUE

          </button>
          <p data-testid="customer_order_details__element-order-total-price">
            {`Total: R$ ${getOrder[0].totalPrice.replace('.', ',')}`}
          </p>
        </div>
      )) : <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            getCart.length > 0 && getCart.map((product, index) => {
              const { name, price, SaleProduct: { productId, quantity,
              } } = product;
              const unitPrice = Number(price);
              const subTotal = unitPrice * quantity;
              // test ids
              const TEST_PREFIX = 'customer_order_details__element-order-table-';

              return (
                <tr key={ productId }>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}item-number-${index}` }
                    >
                      { index + 1}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}name-${index}` }
                    >
                      {name}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}quantity-${index}` }
                    >
                      {quantity}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}unit-price-${index}` }
                    >
                      {Number(unitPrice).toFixed(2).replace('.', ',')}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}sub-total-${index}` }
                    >
                      {Number(subTotal).toFixed(2).replace('.', ',')}
                    </span>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
