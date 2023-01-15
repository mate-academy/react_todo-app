import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { createUser, getUserByEmail } from '../../api/users';
import { User } from '../../types/User';
import { Storage } from '../../utils/storageService';

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
    Storage.set('user', user);
    onLogin(user);
  };

  useEffect(() => {
    const userData = Storage.get('user');

    if (!userData) {
      return;
    }

    try {
      const user = JSON.parse(userData) as User;

      onLogin(user);
    } catch (error) {
      setErrorMessage('Need to login');
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
    <form onSubmit={handleSubmit} className="login-form">
      <h1 className="login-form__title">
        {needToRegister ? 'You need to register' : 'Log in to open todos'}
      </h1>

      <div className="login-form__field">
        <label className="login-form__label" htmlFor="user-email">
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
            className={classNames(
              'login-form__input',
              { 'login-form__input--danger': !needToRegister && errorMessage },
            )}
            placeholder="Enter your email"
            disabled={loading || needToRegister}
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {!needToRegister && errorMessage && (
          <p className="login-form__error">{errorMessage}</p>
        )}
      </div>

      {needToRegister && (
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="user-name">
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
              className={classNames(
                'login-form__input',
                { 'login-form__input--danger': needToRegister && errorMessage },
              )}
              placeholder="Enter your name"
              required
              minLength={4}
              disabled={loading}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {needToRegister && errorMessage && (
            <p className="login-form__error">{errorMessage}</p>
          )}
        </div>
      )}

      <div className="login-form__field">
        <button
          type="submit"
          className={classNames(
            'login-form__button',
            { 'login-form__button--is-loading': loading },
          )}
        >
          {needToRegister ? 'Register' : 'Login'}
        </button>
      </div>
    </form>
  );
};
