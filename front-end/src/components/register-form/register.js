import { useState, useEffect } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allowedToRegister, setAllowedToRegister] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    function validateRegistrationForm() {
      const emailRegex = /\S+@\S+\.\S+/i;
      const MIN_PASS_LENGTH = 6;
      const MIN_NAME_LENGTH = 12;

      const passwordIsValid = password.length >= MIN_PASS_LENGTH;
      const emailIsValid = emailRegex.test(email);
      const nameIsValid = name.length > MIN_NAME_LENGTH;

      return passwordIsValid && emailIsValid && nameIsValid;
    }
    setAllowedToRegister(validateRegistrationForm());
  }, [name, email, password]);

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
          disabled={ !allowedToRegister }
        >
          Registrar
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
