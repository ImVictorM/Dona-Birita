import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import requestWithCORS from '../../utils/requestWithCORS';
import { POST_USER_LOGIN } from '../../utils/backendEndpoints';
import logo from '../../images/donabiritaLogo.png';
import styles from './loginForm.module.scss';

function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginIsDisabled, setLoginIsDisabled] = useState(true);
  const [showError, setShowError] = useState(false);

  const LOGGED_USER_ENDPOINTS = {
    customer: '/customer/products',
    administrator: '/admin/manage',
    seller: '/seller/orders',
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      history.push(LOGGED_USER_ENDPOINTS[user.role]);
    }
  });

  useEffect(() => {
    function loginInfoIsValid() {
      const regex = /\S+@\S+\.\S+/i;
      const MIN_PASSWORD_LENGTH = 5;
      return (regex.test(email) && password.length > MIN_PASSWORD_LENGTH);
    }
    setLoginIsDisabled(!loginInfoIsValid());
  }, [email, password]);

  async function loginUser(userInfo) {
    const responseLogin = await requestWithCORS(POST_USER_LOGIN, userInfo);
    localStorage.setItem('user', JSON.stringify(responseLogin));
    return responseLogin;
  }

  async function handleLogin() {
    try {
      const user = await loginUser({ email, password });
      history.push(LOGGED_USER_ENDPOINTS[user.role]);
    } catch (error) {
      setShowError(true);
    }
  }

  return (
    <form className={ styles.login }>
      <img
        src={ logo }
        className={ styles.login__logo }
        alt="dona birita logo"
      />
      <div className={ styles.login__container }>
        <div className={ styles.login__inputs }>
          <label htmlFor="email" className={ styles.login__label }>
            E-mail
            <input
              onChange={ (event) => setEmail(event.target.value) }
              value={ email }
              type="text"
              data-testid="common_login__input-email"
              id="email"
              placeholder="Digite seu e-mail"
            />
          </label>
          <label htmlFor="password" className={ styles.login__label }>
            Senha
            <input
              onChange={ (event) => setPassword(event.target.value) }
              value={ password }
              type="password"
              data-testid="common_login__input-password"
              id="password"
              placeholder="Digite sua senha"
            />
          </label>
        </div>

        {
          showError && (
            <span
              data-testid="common_login__element-invalid-email"
              className={ styles.login__error }
            >
              Email ou senha incorreta!
            </span>
          )
        }

        <button
          disabled={ loginIsDisabled }
          type="button"
          data-testid="common_login__button-login"
          onClick={ handleLogin }
          className={ styles.login__container__button }
        >
          Entrar
        </button>

        <div className={ styles.login__container__link }>
          <p>Não tem uma conta?</p>
          <Link
            data-testid="common_login__button-register"
            to="/register"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
