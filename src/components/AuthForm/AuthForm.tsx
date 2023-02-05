import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { createUser, getUserByEmail } from '../../api/users';
import { User } from '../../types/User';
import { AuthContext } from '../../context/AuthContext';
import { ErrorNotification } from '../ErrorNotification';

export const AuthForm: FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const generateError = useCallback((message: string) => {
    setErrorMessage(message);
    setHasError(true);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    try {
      const user = JSON.parse(userData) as User;

      setUser(user);
    } catch (error) {
      generateError('Something went wrong!');
    }
  }, []);

  const loadUser = async () => {
    const user = await getUserByEmail(email);

    if (user) {
      saveUser(user);
      navigate('/todos');
    } else {
      setNeedToRegister(true);
    }
  };

  const registerUser = () => {
    return createUser({ name, email })
      .then(saveUser)
      .then(() => navigate('/todos'));
  };

  const isEmailValid = () => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

    if (!email) {
      generateError('Email can\'t be empty!');

      return false;
    }

    if (!emailPattern.test(email)) {
      generateError('Invalid email!');

      return false;
    }

    return true;
  };

  const isNameValid = () => {
    if (!name && needToRegister) {
      generateError('Name can\'t be empty!');

      return false;
    }

    if (name.length < 3 && needToRegister) {
      generateError('The name must be at least 3 letters!');

      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isEmailValid() || !isNameValid()) {
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      if (needToRegister) {
        await registerUser();
      } else {
        await loadUser();
      }
    } catch (error) {
      generateError('Something went wrtong');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'email' | 'name',
  ) => {
    setHasError(false);

    if (type === 'email') {
      setEmail(event.target.value);
    } else {
      setName(event.target.value);
    }
  };

  const closeNotification = useCallback(() => (
    setHasError(false)
  ), []);

  useEffect(() => {
    setTimeout(() => setHasError(false), 2000);
  }, [hasError]);

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
            className={classNames(
              'control',
              'has-icons-left',
              { 'is-loading': loading },
            )}
          >
            <input
              type="text"
              id="user-email"
              className={classNames('input', {
                'is-danger': !needToRegister && errorMessage,
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
                  'is-danger': needToRegister && errorMessage,
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

      <ErrorNotification
        hasError={hasError}
        errorMessage={errorMessage}
        closeNotification={closeNotification}
      />
    </>
  );
};
