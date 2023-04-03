import { useEffect, useState } from 'react';

function AdminForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [role, setRole] = useState();

  useEffect(() => {
    const validRegister = () => {
      const regex = /\S+@\S+\.\S+/i;
      const minCharPass = 5;
      const minCharName = 11;
      return (regex.test(email)
      && password.length > minCharPass && name.length > minCharName);
    };
    if (validRegister()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, name]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="name">
        Nome Completo:
        <input
          value={ name }
          type="text"
          data-testid="admin_manage__input-name"
          onChange={ (event) => setName(event.target.value) }
          id="name"
        />
      </label>
      <label htmlFor="email">
        E-Mail:
        <input
          value={ email }
          type="email"
          data-testid="admin_manage__input-email"
          onChange={ (event) => setEmail(event.target.value) }
          id="email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          value={ password }
          type="text"
          data-testid="admin_manage__input-password"
          onChange={ (event) => setPassword(event.target.value) }
          id="password"
        />
      </label>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        value="register-button"
        onClick={ handleSubmit }
        disabled={ isDisabled }
      >
        Cadastrar
      </button>
      <select
        data-testid="admin_manage__select-role"
        value={ role }
        defaultValue="customer"
        onChange={ (event) => setRole(event.target.value) }
      >
        <option value="seller">Vendedor</option>
        <option value="customer">Cliente</option>
      </select>
    </form>
  );
}

export default AdminForm;
