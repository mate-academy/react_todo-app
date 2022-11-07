import React, {
  FormEvent,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  createUser,
  getUserByEmail,
} from '../../../api/users';
import { User } from '../../../types/User';
import { Error } from '../../../types/Error';

export type Props = {
  onLogin: (user: User) => void,
};

export const AuthForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);

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
      const user: User = JSON.parse(userData);

      onLogin(user);
    } catch {
      setErrorMessage(Error.LOGIN);
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

  const registerUser = async () => {
    const user = await createUser({ name, email });

    return saveUser(user);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setErrorMessage(null);
    setLoading(true);

    try {
      if (needToRegister) {
        await registerUser();
      } else {
        await loadUser();
      }
    } catch {
      setErrorMessage(Error.AUTH_WARN);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="box mt-5"
      onSubmit={handleSubmit}
    >
      <h1 className="title is-3">
        {needToRegister
          ? 'You need to register'
          : 'Log in to open todos'}
      </h1>

      <div className="field">
        <label className="label" htmlFor="user-email">
          Email
        </label>

        <div
          className={classNames(
            'control',
            'has-icons-left',
            { 'is-loading': loading },
          )}
        >
          <input
            type="email"
            id="user-email"
            className={classNames(
              'input',
              { 'is-danger': !needToRegister && errorMessage },
            )}
            placeholder="Enter your email"
            disabled={loading || needToRegister}
            value={email}
            required
            onChange={event => setEmail(event.target.value)}
          />

          <span
            className="
              icon
              is-small
              is-left"
          >
            <i className="fas fa-envelope" />
          </span>
        </div>

        {!needToRegister
          && errorMessage
          && (
            <p className="help is-danger">
              {errorMessage}
            </p>
          )}
      </div>

      {needToRegister && (
        <div className="field">
          <label className="label" htmlFor="user-name">
            Your Name
          </label>

          <div
            className={classNames(
              'control',
              'has-icons-left',
              { 'is-loading': loading },
            )}
          >
            <input
              type="text"
              id="user-name"
              className={classNames(
                'input',
                { 'is-danger': needToRegister && errorMessage },
              )}
              placeholder="Enter your name"
              required
              minLength={4}
              disabled={loading}
              value={name}
              onChange={event => setName(event.target.value)}
            />

            <span
              className="
                icon
                is-small
                is-left"
            >
              <i className="fas fa-user" />
            </span>
          </div>

          {needToRegister
            && errorMessage
            && (
              <p className="help is-danger">
                {errorMessage}
              </p>
            )}
        </div>
      )}

      <div className="field">
        <button
          type="submit"
          className={classNames(
            'button',
            'is-primary',
            { 'is-loading': loading },
          )}
        >
          {needToRegister
            ? 'Register'
            : 'Login'}
        </button>
      </div>
    </form>
  );
};
