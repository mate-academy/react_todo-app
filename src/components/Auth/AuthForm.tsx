import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getUserByEmail } from '../../api/users';
import { User } from '../../types/User';

export type Props = {
  onLogin: (user: User) => void,
};

export const AuthForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isContinue, setIsContinue] = useState(false);
  const navigate = useNavigate();

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
    navigate(`${user.id}/todos`);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    setIsContinue(true);
  }, []);

  const handleContinue = () => {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);

      saveUser(user);
    }
  };

  const loadUser = async () => {
    const user = await getUserByEmail(email);

    if (user.length === 0) {
      setNeedToRegister(true);

      return;
    }

    try {
      if ('Error' in user) {
        throw new Error();
      }

      saveUser(user[0]);
    } catch {
      setErrorMessage('Something went wrong');
    }
  };

  const registerUser = () => {
    return createUser({ name, email })
      .then(user => {
        if ('Error' in user) {
          throw new Error();
        }

        saveUser(user);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      });
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
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
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
          className={classNames('control has-icons-left', {
            'is-loading': loading,
          })}
        >
          <input
            type="email"
            id="user-email"
            className={classNames('input', {
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
            className={classNames('control has-icons-left', {
              'is-loading': loading,
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
          className={classNames(
            'button',
            'is-primary',
            'mr-3',
            {
              'is-loading': loading,
            },
          )}
        >
          {needToRegister ? 'Register' : 'Login'}
        </button>

        {isContinue
          && (
            <button
              type="submit"
              onClick={handleContinue}
              className={classNames(
                'button',
                'is-primary',
                {
                  'is-loading': loading,
                },
              )}
            >
              Continue the last session
            </button>
          )}
      </div>
    </form>
  );
};
