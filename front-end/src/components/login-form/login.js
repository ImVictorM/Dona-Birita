import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    function validateLogin() {
      const regex = /\S+@\S+\.\S+/i;
      const magicNumber = 5;
      return (regex.test(email) && password.length > magicNumber);
    }
    if (validateLogin()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="inputs-container">
        <label htmlFor="email">
          E-mail
          <input
            onChange={ (event) => setEmail(event.target.value) }
            value={ email }
            type="text"
            data-testid="common_login__input-email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            onChange={ (event) => setPassword(event.target.value) }
            value={ password }
            type="password"
            data-testid="common_login__input-password"
            id="password"
          />
        </label>
        <button
          disabled={ isDisabled }
          type="submit"
          data-testid="common_login__button-login"
        >
          Login

        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          <Link to="/register">
            Cadastrar
          </Link>

        </button>
      </div>
    </form>
  );
}

export default LoginForm;
