import { useEffect, useState, useContext } from 'react';
import styles from './adminRegisterForm.module.scss';
import { UserContext } from '../../context/Context';

function AdminRegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer');
  const [password, setPassword] = useState('');

  const { registerNewUser } = useContext(UserContext);
  const [canRegister, setCanRegister] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const formIsValid = () => {
      const emailRegex = /\S+@\S+\.\S+/i;
      const MIN_PASS_LENGTH = 6;
      const MIN_NAME_LENGTH = 12;
      return (
        emailRegex.test(email)
        && password.length >= MIN_PASS_LENGTH
        && name.length >= MIN_NAME_LENGTH
      );
    };
    setCanRegister(formIsValid());
  }, [email, password, name]);

  async function handleUserRegistration() {
    const userToRegister = { name, email, password, role };
    const auth = JSON.parse(localStorage.getItem('user')).token;
    try {
      await registerNewUser(userToRegister, auth);
    } catch (error) {
      setShowError(true);
    }
  }

  return (
    <form className={ styles.adm__register }>
      <h2 className={ styles.adm__register__title }>Cadastrar novo usuário</h2>
      <hr />
      <div className={ styles.adm__register__inputs }>
        <label htmlFor="name" className={ styles.adm__register__inputs__label }>
          Nome Completo:
          <input
            value={ name }
            type="text"
            data-testid="admin_manage__input-name"
            onChange={ (event) => setName(event.target.value) }
            id="name"
            name="name"
            className={ styles.adm__register__inputs__input }
          />
        </label>
        <label htmlFor="email" className={ styles.adm__register__inputs__label }>
          E-Mail:
          <input
            value={ email }
            type="email"
            data-testid="admin_manage__input-email"
            onChange={ (event) => setEmail(event.target.value) }
            id="email"
            name="email"
            className={ styles.adm__register__inputs__input }
          />
        </label>
        <label htmlFor="password" className={ styles.adm__register__inputs__label }>
          Senha:
          <input
            value={ password }
            type="text"
            data-testid="admin_manage__input-password"
            onChange={ (event) => setPassword(event.target.value) }
            id="password"
            name="password"
            className={ styles.adm__register__inputs__input }
          />
        </label>
        <label htmlFor="role" className={ styles.adm__register__inputs__label }>
          Tipo:
          <select
            data-testid="admin_manage__select-role"
            value={ role }
            id="role"
            name="role"
            onChange={ (event) => setRole(event.target.value) }
            className={ styles.adm__register__inputs__input }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
        </label>
      </div>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        value="register-button"
        onClick={ handleUserRegistration }
        disabled={ !canRegister }
        className={ styles.adm__register__submit }
      >
        Cadastrar
      </button>

      {
        showError && (
          <p className="error" data-testid="admin_manage__element-invalid-register">
            Nome ou e-mail já cadastrado!
          </p>
        )
      }
    </form>
  );
}

export default AdminRegisterForm;
