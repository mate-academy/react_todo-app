import {
  FC, useContext, useEffect, useState,
} from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { createUser, getUserByEmail } from '../../api/users';

import { ErrorMessage } from '../ErrorMessage';

import { User } from '../../types/User';
import { ErrorType } from '../../types/ErrorType';

export const AuthForm: FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [needToRegister, setNeedToRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorTrigger, setErrorTrigger] = useState(0);

  const { setUser, createSlug } = useContext(AuthContext);
  const { errorType, setErrorType, clearError } = useContext(ErrorContext);
  const navigate = useNavigate();

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const triggerError = () => setErrorTrigger((curr) => curr + 1);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    try {
      const user = JSON.parse(userData) as User;

      setUser(user);
    } catch (error) {
      setErrorType(ErrorType.Unexpected);
    }
  }, []);

  useEffect(() => {
    setTimeout(clearError, 3000);
  }, [errorTrigger]);

  const loadUser = async () => {
    const user = await getUserByEmail(email);

    if (user) {
      saveUser(user);
      navigate(`/${createSlug(user.name)}`);
    } else {
      setNeedToRegister(true);
    }
  };

  const registerUser = () => {
    return createUser({ name, email })
      .then(saveUser)
      .then(() => navigate(`/${createSlug(name)}`));
  };

  const isValidEmail = () => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email) {
      setErrorType(ErrorType.EmptyEmail);
      triggerError();

      return false;
    }

    if (!regex.test(email)) {
      setErrorType(ErrorType.InvalidEmail);
      triggerError();

      return false;
    }

    return true;
  };

  const isValidName = () => {
    if (needToRegister && !name) {
      setErrorType(ErrorType.EmptyName);
      triggerError();

      return false;
    }

    if (needToRegister && name.length < 3) {
      setErrorType(ErrorType.InvalidName);
      triggerError();

      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidEmail() || !isValidName()) {
      return;
    }

    clearError();
    setLoading(true);

    try {
      if (needToRegister) {
        await registerUser();
      } else {
        await loadUser();
      }
    } catch (error) {
      setErrorType(ErrorType.Unexpected);
      triggerError();
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'name' | 'email',
  ) => {
    clearError();

    if (type === 'name') {
      setName(event.target.value);
    } else {
      setEmail(event.target.value);
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
              type="text"
              id="user-email"
              className={classNames('input', {
                'is-danger': !needToRegister && errorType,
              })}
              placeholder="Enter your email"
              disabled={loading || needToRegister}
              value={email}
              onChange={e => handleInputChange(e, 'email')}
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
              className={classNames(
                'control',
                'has-icons-left',
                { 'is-loading': loading },
              )}
            >
              <input
                type="text"
                id="user-name"
                className={classNames('input', {
                  'is-danger': needToRegister && errorType,
                })}
                placeholder="Enter your name"
                disabled={loading}
                value={name}
                onChange={e => handleInputChange(e, 'name')}
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
            className={classNames(
              'button',
              'is-primary',
              { 'is-loading': loading },
            )}
          >
            {needToRegister ? 'Register' : 'Login'}
          </button>
        </div>
      </form>

      <CSSTransition
        classNames="error"
        in={!!errorType}
        timeout={500}
        unmountOnExit
      >
        <ErrorMessage />
      </CSSTransition>
    </>
  );
};
