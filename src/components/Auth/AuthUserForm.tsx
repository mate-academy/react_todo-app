import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createUser, getUserByEmail } from '../../api/users';
import { Errors } from '../../types/Errors';
import { User } from '../../types/User';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

export type Props = {
  onLogin: (user: User) => void,
};

export const AuthUserForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.NONE);
  const [isError, setIsError] = useState(false);

  const showError = (message: Errors) => {
    setIsError(true);
    setErrorMessage(message);
    setTimeout(() => setIsError(false), 3000);
  };

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
      showError(Errors.LOAD);
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

    setLoading(true);

    try {
      if (needToRegister) {
        await registerUser();
      } else {
        await loadUser();
      }
    } catch (error) {
      showError(Errors.REGISTRATION);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="box mt-5">
        <h1 className="title is-3">
          {needToRegister ? 'You need to register' : 'Log in to open todos'}
        </h1>

        <div className="field">
          <label className="label" htmlFor="user-email">
            Email
          </label>

          <div
            className={classNames('control has-icons-left', {
              'is-loading': loading,
            })}
          >
            <input
              type="email"
              id="user-email"
              className={classNames('input', {
                'is-danger': !needToRegister && isError,
              })}
              placeholder="Enter your email"
              disabled={loading || needToRegister}
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </div>
        </div>

        {needToRegister && (
          <div className="field">
            <label className="label" htmlFor="user-name">
              Your Name
            </label>

            <div
              className={classNames('control has-icons-left', {
                'is-loading': loading,
              })}
            >
              <input
                type="text"
                id="user-name"
                className={classNames('input', {
                  'is-danger': needToRegister && isError,
                })}
                placeholder="Enter your name"
                required
                minLength={4}
                disabled={loading}
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
          </div>
        )}

        <div className="field">
          <button
            type="submit"
            className={classNames('button is-primary', {
              'is-loading': loading,
            })}
          >
            {needToRegister ? 'Register' : 'Login'}
          </button>
        </div>
      </form>

      {isError && (
        <ErrorNotification
          isError={isError}
          setIsError={setIsError}
          error={errorMessage}
        />
      )}
    </>
  );
};
