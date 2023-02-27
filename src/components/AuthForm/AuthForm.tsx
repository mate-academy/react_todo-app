import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { createUser, getUserByEmail } from '../../api/users';

import { User } from '../../types/User';
import { OnShowErrorFunc } from '../../types/OnErrorFunc';
import { ErrorType } from '../../enums/ErrorType';

export type Props = {
  hasError: boolean;
  showError: OnShowErrorFunc;
  hideError: () => void;
  onLogin: (user: User) => void;
};

export const AuthForm: React.FC<Props> = ({
  hasError,
  showError,
  hideError,
  onLogin,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveUser = (user: User) => {
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
    } catch {
      showError(ErrorType.GetUser);
    }
  }, []);

  const loadUser = async () => {
    const user = await getUserByEmail(email);

    if (user) {
      handleSaveUser(user);

      return;
    }

    setNeedToRegister(true);
  };

  const registerUser = () => {
    return createUser({ name, email }).then(handleSaveUser);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    hideError();
    setLoading(true);

    try {
      if (needToRegister) {
        await registerUser()
          .catch(() => showError(ErrorType.Register));
      } else {
        await loadUser()
          .catch(() => showError(ErrorType.GetUser));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="box mt-5"
    >
      <h1 className="title is-3">
        {needToRegister ? 'You need to register' : 'Log in to open todos'}
      </h1>

      <div className="field">
        <label
          className="label"
          htmlFor="user-email"
        >
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
              'is-danger': !needToRegister && hasError,
            })}
            placeholder="Enter your email"
            disabled={loading || needToRegister}
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>
      </div>

      {needToRegister && (
        <div className="field">
          <label
            className="label"
            htmlFor="user-name"
          >
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
                'is-danger': needToRegister && hasError,
              })}
              placeholder="Enter your name"
              required
              minLength={4}
              disabled={loading}
              value={name}
              onChange={(event) => setName(event.target.value)}
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
  );
};
