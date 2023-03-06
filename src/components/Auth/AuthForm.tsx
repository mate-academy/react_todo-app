import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createUser, getUserByEmail } from '../../api/users';
import { User } from '../../types/User';
import { RegisterField } from '../RegisterField';

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
      throw new Error('Need to login');
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
    <form onSubmit={handleSubmit} className="authForm">
      <h1 className="title-suthForm">
        {needToRegister ? 'You need to register' : 'Log in to open todos'}
      </h1>

      <div className="fieldRegister">
        <label className="fieldRegister__label" htmlFor="user-email">
          Email
        </label>
        <input
          type="email"
          id="user-email"
          className={classNames('authForm__input', {
            'is-danger': needToRegister && errorMessage,
          })}
          placeholder="Enter your email"
          disabled={loading || needToRegister}
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        {needToRegister && errorMessage && (
          <p className="is-danger">{errorMessage}</p>
        )}
      </div>

      {needToRegister && (
        <RegisterField
          loading={loading}
          errorMessage={errorMessage}
          needToRegister={needToRegister}
          name={name}
          setName={setName}
        />
      )}

      <button
        type="submit"
        className="submitAuthForm"
      >
        {needToRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
};
