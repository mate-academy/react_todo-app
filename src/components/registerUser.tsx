import classNames from 'classnames';
import { useState } from 'react';
import { User } from '../types/User';
import { createUser, getUserByEmail } from '../api/users';

interface Props {
  setUser: React.Dispatch<any>,
}

export const RegisterUser: React.FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [needToRegister, setNeedToRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function saveUser(someUser: User) {
    setUser(someUser);
    localStorage.setItem('user', JSON.stringify(someUser));
  }

  function register() {
    return createUser({ name, email })
      .then(saveUser)
      .catch(() => {
        setErrorMessage('Can\'t create a user');
      });
  }

  function checkEmail() {
    return getUserByEmail(email)
      .then(existingUser => {
        if (existingUser) {
          saveUser(existingUser);
        } else {
          setNeedToRegister(true);
        }
      })
      .catch(() => {
        setErrorMessage('Can\'t create a user');
      });
  }

  async function handleSubmit() {
    setLoading(true);

    if (needToRegister) {
      await register();
    } else {
      await checkEmail();
    }

    setLoading(false);
  }

  return (
    <section className="container is-flex is-justify-content-center">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        className="box mt-5"
      >
        <h1 className="title is-3">
          {needToRegister ? 'You need to register' : 'Get your userId'}
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
              name="email"
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
                name="name"
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
            className={classNames('button is-primary', {
              'is-loading': loading,
            })}
          >
            {needToRegister ? 'Register' : 'Login'}
          </button>
        </div>
      </form>
    </section>
  );
};
