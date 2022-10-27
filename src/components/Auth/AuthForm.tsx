import React, { useState } from 'react';
import classnames from 'classnames';
import { User } from '../../types/User';

type Props = {
  onLogin: (user: User) => void,
};

export const AuthForm: React.FC<Props> = ({
  onLogin,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [needToRegister, setNeedToRegister] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // eslint-disable-next-line no-console
  console.log(onLogin, setLoading, setNeedToRegister, setErrorMessage);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="box mt-5">
      <h1 className="title is-3">
        {needToRegister ? 'You need to register' : 'Log in to open todos'}
      </h1>

      <div className="field">
        <label className="label" htmlFor="user-email">
          Email
        </label>

        <div
          className={classnames('control has-icons-left', {
            'is-loading': loading,
          })}
        >
          <input
            type="email"
            id="user-email"
            className={classnames('input', {
              'is-danger': !needToRegister && errorMessage,
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

        {!needToRegister && errorMessage && (
          <p className="help is-danger">{errorMessage}</p>
        )}
      </div>

      {needToRegister && (
        <div className="field">
          <label className="label" htmlFor="user-name">
            Your Name
          </label>

          <div
            className={classnames('control has-icons-left', {
              'is-loading': loading,
            })}
          >
            <input
              type="text"
              id="user-name"
              className={classnames('input', {
                'is-danger': needToRegister && errorMessage,
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

          {needToRegister && errorMessage && (
            <p className="help is-danger">{errorMessage}</p>
          )}
        </div>
      )}

      <div className="field">
        <button
          type="submit"
          className={classnames('button is-primary', {
            'is-loading': loading,
          })}
        >
          {needToRegister ? 'Register' : 'Login'}
        </button>
      </div>
    </form>
  );
};
