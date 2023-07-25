import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { createUser, getUserByEmail } from '../../api/user';
import { User } from '../../types/User';

interface Props {
  onLogin: (user: User) => void;
}

export const AuthForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      setErrorMessage('Need to LogIn');
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
    setIsLoading(true);

    try {
      if (needToRegister) {
        await registerUser();
      } else {
        await loadUser();
      }
    } catch (error) {
      setErrorMessage('Something went wrtong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box mt-5">
      <h1 className="title">
        {needToRegister ? 'You need to register' : 'Log in to open todos'}
      </h1>

      <div className="field">
        <label className="label" htmlFor="user-email">
          Email
        </label>

        <div
          className={classNames('control has-icons-left', {
            'is-loading': isLoading,
          })}
        >
          <input
            type="email"
            id="user-email"
            className={classNames('input', {
              'is-danger': !needToRegister && errorMessage,
            })}
            placeholder="Enter your email"
            disabled={isLoading || needToRegister}
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
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
            className={classNames('control has-icons-left', {
              'is-loading': isLoading,
            })}
          >
            <input
              type="text"
              id="user-name"
              className={classNames('input', {
                'is-danger': needToRegister && errorMessage,
              })}
              placeholder="Enter your name"
              required
              minLength={4}
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          className={classNames('button is-primary', {
            'is-loading': isLoading,
          })}
        >
          {needToRegister ? 'Register' : 'Login'}
        </button>
      </div>
    </form>
  );
};
