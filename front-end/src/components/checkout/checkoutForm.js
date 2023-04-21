import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../context/Context';
import requestWithCORS from '../../utils/requestWithCORS';
import { GET_SELLER_LIST, POST_SALE_REGISTER } from '../../utils/backendEndpoints';
import './checkoutForm.css';

function CheckoutForm() {
  const history = useHistory();
  const [sellerList, setSellerList] = useState([]);
  const [form, setForm] = useState({
    address: '',
    number: '',
    sellerId: '',
  });
  const { cartTotal, cart } = useContext(CartContext);

  useEffect(() => {
    async function getSellerList() {
      const sellersFromDB = await requestWithCORS(GET_SELLER_LIST);
      setSellerList(sellersFromDB);
    }
    getSellerList();
  }, []);

  useEffect(() => {
    if (sellerList.length > 0) {
      setForm((prevForm) => ({ ...prevForm, sellerId: sellerList[0].id }));
    }
  }, [sellerList]);

  function makeSaleObj() {
    const user = JSON.parse(localStorage.getItem('user'));
    const products = cart.map(({ productId, quantity }) => ({ productId, quantity }));
    const INITIAL_SALE_STATUS = 'Pendente';
    const sale = {
      userId: user.id,
      sellerId: form.sellerId,
      totalPrice: cartTotal,
      deliveryAddress: form.address,
      deliveryNumber: form.number,
      status: INITIAL_SALE_STATUS,
      products,
      saleDate: new Date().toISOString(),
    };
    return sale;
  }

  async function registerSale() {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const sale = makeSaleObj();
    const creationResponse = await requestWithCORS(POST_SALE_REGISTER, sale, token);
    const { id: saleId } = creationResponse;
    history.push(`/customer/orders/${saleId}`);
  }

  function handleChange({ target }) {
    const fieldName = target.name;
    const fieldValue = target.value;
    setForm({ ...form, [fieldName]: fieldValue });
  }

  return (
    <form className="checkout-form">
      <label htmlFor="seller">
        <p>P. Vendedora Responsável:</p>
        <select
          onChange={ handleChange }
          data-testid="customer_checkout__select-seller"
          id="seller"
          name="sellerId"
          value={ form.sellerId }
        >
          {
            sellerList.map((seller) => {
              const { id, name } = seller;
              return (
                <option key={ id } value={ id }>{name}</option>
              );
            })
          }
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
        className="finish-sale-btn"
      >
        Finalizar Pedido
      </button>
    </form>
  );
}

export default CheckoutForm;
