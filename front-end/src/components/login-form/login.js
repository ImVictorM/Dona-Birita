// import { useState } from 'react';

function LoginForm() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="inputs-container">
        <label htmlFor="email">
          E-mail
          <input type="text" data-testid="common_login__input-email" id="email" />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            data-testid="common_login__input-password"
            id="password"
          />
        </label>
        <button type="submit" data-testid="common_login__button-login">Login</button>
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Cadastrar

        </button>
      </div>
    </form>
  );
}

export default LoginForm;
