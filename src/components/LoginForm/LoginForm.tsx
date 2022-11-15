import React, {
  useState,
  useContext,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';

import { Context } from '../context';

import { getUsers, addUsers } from '../../api';

export const LoginForm: React.FC = () => {
  const {
    setUser,
    setChangeUserButton,
    error,
  } = useContext(Context);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailLoader, setEmailLoader] = useState(false);

  // eslint-disable-next-line max-len
  const regexp = /^((([0-9A-Za-z]{1}[-0-9A-z\\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/g;

  // eslint-disable-next-line max-len
  const loginEvent = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!email.match(regexp)) {
      setEmailError(true);

      return;
    }

    setEmailLoader(true);

    getUsers(email)
      .then((user) => {
        if (user.length !== 0) {
          setUser(user[0]);
          setEmailLoader(false);
          localStorage.setItem('user', JSON.stringify(user[0]));
          window.location.hash = '/todos';
        } else {
          addUsers(email)
            .then(() => {
              setUser(user[0]);
              setEmailLoader(false);
              localStorage
                .setItem('user', JSON.stringify(user[0]));
            }).catch(() => {
              error('Server error');
              setEmailLoader(false);
            });
        }

        setChangeUserButton(true);
      }).catch(() => {
        error('Server error');
        setEmailLoader(false);
      });
  };

  return (
    <div
      className="todoapp"
      data-theme="ligth"
    >
      <header className="header">
        <h1>Log in</h1>
      </header>

      <section className="main login">
        <form>
          <label className="login__label">
            <div className="login__text">Enter your email</div>
            <input
              id="login"
              type="email"
              data-cy="createTodo"
              className={classNames(
                'new-todo',
                'login__input',
                { 'login__input--error': emailError },
                { 'login__input--disabled': emailLoader },
              )}
              value={email}
              placeholder="Email *"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  loginEvent(e);
                }
              }}
              disabled={emailLoader}
            />
            <label
              htmlFor="login"
              className={classNames({ login__error: emailError })}
              hidden={!emailError}
            >
              Enter correct email
            </label>
            <button
              type="button"
              className="login__button"
              onClick={loginEvent}
              disabled={emailLoader}
            >
              Login
            </button>
          </label>
        </form>
      </section>
    </div>
  );
};
