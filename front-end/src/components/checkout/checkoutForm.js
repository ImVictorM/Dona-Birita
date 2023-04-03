function CheckoutForm() {
  return (
    <form>
      <label htmlFor="seller">
        <p>P. Vendedora Responsável:</p>
        <select data-testid="customer_checkout__select-seller" id="seller">
          <option value="">Marcola</option>
          <option value="">Lamborguine</option>
        </select>
      </label>
      <label htmlFor="address">
        <p>Endereço</p>
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          id="address"
        />
      </label>
      <label htmlFor="number">
        <p>Número</p>
        <input
          type="number"
          id="number"
          data-testid="customer_checkout__input-address-number"
        />
      </label>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </form>
  );
}

export default CheckoutForm;
