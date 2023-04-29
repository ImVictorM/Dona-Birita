import { useEffect, useState } from 'react';
import requestWithCORS from '../../utils/requestWithCORS';
import './adminRegisterForm.css';
import { ADMIN_POST_USER_REGISTER } from '../../utils/backendEndpoints';

function AdminRegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer');
  const [password, setPassword] = useState('');

  const [canRegister, setCanRegister] = useState(true);
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

  async function registerNewUser() {
    const userToRegister = { name, email, password, role };
    const auth = JSON.parse(localStorage.getItem('user')).token;
    try {
      await requestWithCORS(
        ADMIN_POST_USER_REGISTER,
        userToRegister,
        auth,
      );
    } catch (error) {
      setShowError(true);
    }
  }

  return (
    <form className="adm-register-form">
      <div className="adm-register-form-inputs">
        <label htmlFor="name">
          Nome Completo:
          <input
            value={ name }
            type="text"
            data-testid="admin_manage__input-name"
            onChange={ (event) => setName(event.target.value) }
            id="name"
            name="name"
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
            name="email"
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
            name="password"
          />
        </label>
        <label htmlFor="role">
          Tipo:
          <select
            data-testid="admin_manage__select-role"
            value={ role }
            id="role"
            name="role"
            onChange={ (event) => setRole(event.target.value) }
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
        onClick={ registerNewUser }
        disabled={ !canRegister }
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
