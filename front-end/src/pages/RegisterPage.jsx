import React, { useEffect, useState } from 'react';
import validateRegisterInfo from '../utils/registerUtils/validateRegisterInfo';
import handleRegisterButton from '../utils/registerUtils/handleRegisterButton';

function RegisterPage() {
  const [name, setname] = useState('');
  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');
  const [enableButton, setenableButton] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    setenableButton(validateRegisterInfo(name, login, password));
  }, [name, login, password]);

  return (
    <div className="RegisterPageContainer">
      <form>
        <div className="RegisterPage">
          <label htmlFor="name">
            Nome
            <input
              type="email"
              name="name"
              id="name"
              data-testid="common_register__input-name"
              minLength="12"
              onChange={ (e) => setname(e.target.value) }
            />
          </label>
          <label htmlFor="email">
            email
            <input
              type="email"
              name="email"
              id="email"
              data-testid="common_register__input-email"
              onChange={ (e) => setlogin(e.target.value) }
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              id="password"
              data-testid="common_register__input-password"
              minLength="6"
              onChange={ (e) => setpassword(e.target.value) }
            />
          </label>

          <button
            type="submit"
            data-testid="common_register__button-register"
            disabled={ !enableButton }
            onClick={
              async (e) => setError(await handleRegisterButton(e, name, login, password))
            }
          >
            Cadastrar
          </button>
        </div>
        {!error ? (
          <p data-testid="common_register__element-invalid_register">
            Nome/Email ou senha inválidos
          </p>
        ) : null}
      </form>
      <p>zebirita@email.com, $#zebirita#$</p>
    </div>
  );
}

export default RegisterPage;
