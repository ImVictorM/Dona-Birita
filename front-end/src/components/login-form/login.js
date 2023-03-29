import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [showError, setShowError] = useState(false);

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

  async function handleClick() {
    const endpoint = 'http://localhost:3001/login';
    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const loginResponse = await response.json();

    if (loginResponse.message) {
      setShowError(true);
    } else {
      history.push('/customer/products');
    }
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
          onClick={ handleClick }
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
        {
          showError && (
            <p data-testid="common_login__element-invalid-email">Algo deu errado!</p>
          )
        }

      </div>
    </form>
  );
}

export default LoginForm;
