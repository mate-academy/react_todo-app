/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { User } from '../../types/User';
import { createdNewUser, getUserByEmail } from '../../api/users';

import './AuthForm.scss';

type Props = {
  setUser: (user: User) => void,
};

export const AuthForm: React.FC<Props> = React.memo(({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userInLocalStorage = localStorage.getItem('user');

    if (!userInLocalStorage) {
      return;
    }

    try {
      const user = JSON.parse(userInLocalStorage) as User;

      setUser(user);
    } catch {
      setErrorMessage('You need to register');
    }
  }, []);

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const loadUser = async () => {
    const user = await getUserByEmail(email);

    if (user) {
      saveUser(user);
    } else {
      setIsRegistered(false);
    }
  };

  const registerUser = async () => {
    const user = await createdNewUser(name, email);

    saveUser(user);
  };

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isRegistered) {
        await loadUser();
      } else {
        await registerUser();
      }
    } catch (err) {
      setErrorMessage(`${err}: Server error`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form-section section">
      <h1 className="title is-size-1 has-text-centered">
        {isRegistered ? 'Login to open your todos' : 'You need to register'}
      </h1>

      <form className="auth-form box" onSubmit={handlerSubmit}>
        <div className="field">
          <label className="label" htmlFor="email">Email</label>
          <div className={classNames(
            'control has-icons-left',
            { 'is-loading': isLoading },
          )}
          >
            <input
              className="input is-rounded"
              type="email"
              id="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter your email"
              disabled={!isRegistered || isLoading}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </div>

          {isRegistered && errorMessage && (
            <p className="help is-danger">{errorMessage}</p>
          )}
        </div>

        {!isRegistered && (
          <>
            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <div className={classNames(
                'control has-icons-left',
                { 'is-loading': isLoading },
              )}
              >
                <input
                  className="input is-rounded"
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={({ target }) => setName(target.value)}
                  disabled={!isRegistered && isLoading}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </div>

              {!isRegistered && errorMessage && (
                <p className="help is-danger">{errorMessage}</p>
              )}
            </div>
          </>
        )}

        <div className="control">
          <button
            className={classNames(
              'button is-dark is-rounded',
              { 'is-loading': isLoading },
            )}
            type="submit"
          >
            {isRegistered ? 'Log in' : 'Register'}
          </button>
        </div>
      </form>
    </section>
  );
});
