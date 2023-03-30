function AdminForm() {
  return (
    <form>
      <label htmlFor="name">
        Nome Completo:
        <input type="text" data-testid="admin_manage__input-name" id="name" />
      </label>
      <label htmlFor="email">
        E-Mail:
        <input type="email" data-testid="admin_manage__input-email" id="email" />
      </label>
      <label htmlFor="password">
        Nome Completo:
        <input type="text" data-testid="admin_manage__input-password" id="password" />
      </label>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        value="register-button"
      >
        Cadastrar
      </button>
      <select data-testid="admin_manage__select-role">
        <option value="seller">Vendedor</option>
        <option value="customer">Cliente</option>
      </select>
    </form>
  );
}

export default AdminForm;
