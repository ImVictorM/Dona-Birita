import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styles from './registerForm.module.scss';
import requestWithCORS from '../../utils/requestWithCORS';
import { POST_USER_REGISTER } from '../../utils/backendEndpoints';

function RegisterForm() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allowedToRegister, setAllowedToRegister] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    function registrationFormIsValid() {
      const emailRegex = /\S+@\S+\.\S+/i;
      const MIN_PASS_LENGTH = 6;
      const MIN_NAME_LENGTH = 12;

      const passwordIsValid = password.length >= MIN_PASS_LENGTH;
      const emailIsValid = emailRegex.test(email);
      const nameIsValid = name.length >= MIN_NAME_LENGTH;

      return passwordIsValid && emailIsValid && nameIsValid;
    }
    setAllowedToRegister(registrationFormIsValid());
  }, [name, email, password]);

  async function registerUser() {
    const userToRegister = { email, password, name, role: 'customer' };
    const creationResponse = await requestWithCORS(POST_USER_REGISTER, userToRegister);
    return creationResponse;
  }

  async function handleUserRegistration() {
    try {
      const user = await registerUser();
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/customer/products');
    } catch (error) {
      setShowError(true);
    }
  }

  return (
    <form className="login-register-form">
      <div className="inputs-container register">
        <h1 className={ styles.register_title }>Cadastre-se</h1>
        <label htmlFor="name">
          Nome:
          <input
            onChange={ (event) => setName(event.target.value) }
            value={ name }
            type="text"
            data-testid="common_register__input-name"
            id="name"
            placeholder="Insira seu nome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            onChange={ (event) => setEmail(event.target.value) }
            value={ email }
            type="email"
            data-testid="common_register__input-email"
            id="email"
            placeholder="Ex: email@exemplo.com"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            onChange={ (event) => setPassword(event.target.value) }
            value={ password }
            type="password"
            data-testid="common_register__input-password"
            id="password"
            placeholder="Minimo 6 caracteres"
          />
        </label>
        {
          showError && (
            <p
              data-testid="common_register__element-invalid_register"
              className="error register-error"
            >
              Email ou Nome já existem!
            </p>
          )
        }
        <div className="login-buttons">
          <button
            type="button"
            data-testid="common_register__button-register"
            disabled={ !allowedToRegister }
            onClick={ handleUserRegistration }
          >
            Registrar
          </button>

          <div>
            <p>Já possui uma conta?</p>
            <Link
              data-testid="common_register__button-go-back"
              to="/login"
            >
              Fazer login
            </Link>
          </div>
        </div>

      </div>
    </form>
  );
}

export default RegisterForm;
