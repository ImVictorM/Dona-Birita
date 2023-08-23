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
    <form className={ styles.register }>
      <div className={ styles.register__container }>
        <h1 className={ styles.register__title }>Cadastre-se</h1>
        <div className={ styles.register__inputs }>
          <label htmlFor="name" className={ styles.register__label }>
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
          <label htmlFor="email" className={ styles.register__label }>
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
          <label htmlFor="password" className={ styles.register__label }>
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
        </div>

        {
          showError && (
            <span
              data-testid="common_register__element-invalid_register"
              className={ styles.register__error }
            >
              Email ou Nome já existem!
            </span>
          )
        }

        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ !allowedToRegister }
          onClick={ handleUserRegistration }
          className={ styles.register__button }
        >
          Registrar
        </button>

        <div className={ styles.register__container__link }>
          <p>Já possui uma conta?</p>
          <Link
            data-testid="common_register__button-go-back"
            to="/login"
          >
            Fazer login
          </Link>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
