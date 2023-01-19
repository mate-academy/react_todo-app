import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createUser, getUserByEmail } from '../api/users';
import { User } from '../types/User';

export type Props = {
  onLogin: (user: User) => void,
};

export const AuthForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    try {
      const user = JSON.parse(userData) as User;

      onLogin(user);
    } catch (error) {
      // Need to login
    }
  }, []);

  const loadUser = async () => {
    const user = await getUserByEmail(email);

    if (user) {
      saveUser(user);
    } else {
      setNeedToRegister(true);
    }
  };

  const registerUser = () => {
    return createUser({ name, email })
      .then(saveUser);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessage('');
    setLoading(true);

    try {
      if (needToRegister) {
        await registerUser();
      } else {
        await loadUser();
      }
    } catch (error) {
      setErrorMessage('Something went wrtong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth">
      <h1 className="auth__title">
        {needToRegister ? 'You need to register' : 'Log in to open todos'}
      </h1>

      <div className="auth__field">
        <label className="auth__label" htmlFor="user-email">
          Email
        </label>

        <input
          type="email"
          id="user-email"
          className={classNames('auth__input', {
            'auth__is-danger': !needToRegister && errorMessage,
          })}
          placeholder="Enter your email"
          disabled={loading || needToRegister}
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />

        {!needToRegister && errorMessage && (
          <p className="auth__help auth__is-danger">{errorMessage}</p>
        )}
      </div>

      {needToRegister && (
        <div className="auth__field">
          <label className="auth__label" htmlFor="user-name">
            Your Name
          </label>

          <input
            type="text"
            id="user-name"
            className={classNames('auth__input auth__input--name', {
              'auth__is-danger': needToRegister && errorMessage,
            })}
            placeholder="Enter your name"
            required
            minLength={4}
            disabled={loading}
            value={name}
            onChange={e => setName(e.target.value)}
          />

          {needToRegister && errorMessage && (
            <p className="auth__help auth__is-danger">{errorMessage}</p>
          )}
        </div>
      )}

      <div className="auth__field">
        <button
          type="submit"
          className={classNames('auth__button', {
            'auth__is-loading': loading,
          })}
        >
          {needToRegister ? 'Register' : 'Login'}
        </button>
      </div>
    </form>
  );
};
