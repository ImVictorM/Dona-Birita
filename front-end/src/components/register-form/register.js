import { useState } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="inputs-container">
        <label htmlFor="name">
          Nome:
          <input
            onChange={ (event) => setName(event.target.value) }
            value={ name }
            type="text"
            data-testid="common_register__input-name"
            id="name"
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            onChange={ (event) => setEmail(event.target.value) }
            value={ email }
            type="email"
            data-testid="common_register__input-email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            onChange={ (event) => setPassword(event.target.value) }
            value={ password }
            type="password"
            data-testid="common_register__input-password"
            id="password"
          />
        </label>
        <button
          type="submit"
          data-testid="common_register__button-register"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
