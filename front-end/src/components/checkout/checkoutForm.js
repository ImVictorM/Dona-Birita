import { useEffect, useState } from 'react';

function CheckoutForm() {
  const [sellerList, setSellerList] = useState([]);
  const [selectedSellerId, setSelectedSellerId] = useState('');
  const [form, setForm] = useState({
    address: '',
    number: '',
  });

  useEffect(() => {
    async function getSellerList() {
      const endpoint = 'http://localhost:3001/user/seller';

      const response = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const sellersFromDB = await response.json();
      setSellerList(sellersFromDB);
    }
    getSellerList();
  }, []);

  useEffect(() => {
    if (sellerList.length > 0) {
      setSelectedSellerId(sellerList[0].id);
    }
  }, [sellerList]);

  async function registerSale() {
    // fazer depois
    // const endpoint = 'http://localhost:3001/sale';
    // const sale = {
    //   userId: '1',
    //   sellerId: '2',
    //   totalPrice: '21.2',
    //   deliveryAddress: 'simsimsim',
    //   deliveryNumber: 'naonaonao',
    //   saleDate: 'Mon Apr 03 2023 18:05:26 GMT-0300',
    //   status: 'coisando',
    // };
    // await fetch(endpoint, {
    //   method: 'POST',
    //   mode: 'cors',
    //   body: JSON.stringify(sale),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  }

  function handleChange({ target }) {
    const fieldName = target.name;
    const fieldValue = target.value;
    setForm({ ...form, [fieldName]: fieldValue });
  }

  return (
    <form>
      <label htmlFor="seller">
        <p>P. Vendedora Responsável:</p>
        <select
          onChange={ handleChange }
          data-testid="customer_checkout__select-seller"
          id="seller"
          name="sellerId"
          value={ selectedSellerId }
        >
          {
            sellerList.map((seller) => {
              const { id, name } = seller;
              return (
                <option key={ id } value={ id }>{name}</option>
              );
            })
          }
          <option>teste</option>
        </select>
      </label>
      <label htmlFor="address">
        <p>Endereço</p>
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          id="address"
          name="address"
          value={ form.address }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="number">
        <p>Número</p>
        <input
          type="number"
          id="number"
          name="number"
          data-testid="customer_checkout__input-address-number"
          value={ form.number }
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ registerSale }
      >
        Finalizar Pedido
      </button>
    </form>
  );
}

export default CheckoutForm;
