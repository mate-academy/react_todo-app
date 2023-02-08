import {
  FC,
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
  const [isUnregistered, setIsUnregistered] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    try {
      const user = JSON.parse(userData) as User;

      setUser(user);
    } catch (error: unknown) {
      setErrorMessage(`Something went wrong with ${error}`);
    }
  }, []);

  const loadUser = async () => {
    const user = await getUserByEmail(email);

    if (user) {
      saveUser(user);
      navigate('/todos');
    } else {
      setIsUnregistered(true);
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
      setErrorMessage('Email can\'t be empty!');

      return false;
    }

    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email!');

      return false;
    }

    return true;
  };

  const isNameValid = () => {
    if (!name && isUnregistered) {
      setErrorMessage('Name can\'t be empty!');

      return false;
    }

    if (name.length < 3 && isUnregistered) {
      setErrorMessage('The name must be at least 3 letters!');

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
    setIsLoading(true);

    try {
      if (isUnregistered) {
        await registerUser();
      } else {
        await loadUser();
      }
    } catch (error: unknown) {
      setErrorMessage(`Something went wrong with ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    value: string,
    type: 'email' | 'name',
  ) => {
    setErrorMessage('');

    if (type === 'email') {
      setEmail(value);
    } else {
      setName(value);
    }
  };

  useEffect(() => {
    setTimeout(() => setErrorMessage(''), 2000);
  }, [errorMessage]);

  return (
    <>
      <form onSubmit={handleSubmit} className="box mt-5">
        <h1 className="title is-3">
          {isUnregistered ? 'You need to register' : 'Log in to open todos'}
        </h1>

        <div className="field">
          <label className="label" htmlFor="user-email">
            Email
          </label>

          <div
            className={classNames(
              'control',
              'has-icons-left',
              { 'is-loading': isLoading },
            )}
          >
            <input
              type="text"
              id="user-email"
              className={classNames('input', {
                'is-danger': !isUnregistered && errorMessage,
              })}
              placeholder="Enter your email"
              disabled={isLoading || isUnregistered}
              value={email}
              onChange={e => handleInputChange(e.target.value, 'email')}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </div>
        </div>

        {isUnregistered && (
          <div className="field">
            <label className="label" htmlFor="user-name">
              Your Name
            </label>

            <div
              className={classNames(
                'control',
                'has-icons-left',
                { 'is-loading': isLoading },
              )}
            >
              <input
                type="text"
                id="user-name"
                className={classNames('input', {
                  'is-danger': isUnregistered && errorMessage,
                })}
                placeholder="Enter your name"
                disabled={isLoading}
                value={name}
                onChange={e => handleInputChange(e.target.value, 'name')}
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
              { 'is-loading': isLoading },
            )}
          >
            {isUnregistered ? 'Register' : 'Login'}
          </button>
        </div>
      </form>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};
