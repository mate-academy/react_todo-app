import classNames from 'classnames';
import React from 'react';

type Props = {
  loading: boolean,
  needToRegister: boolean,
  errorMessage: string,
  email: string,
  name: string,
  setEmail: (email: string) => void,
  setName: (name: string) => void,
};

export const RegisterField: React.FC<Props> = React.memo(
  ({
    loading,
    needToRegister,
    errorMessage,
    email,
    name,
    setEmail,
    setName,
  }) => {
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => (
      setEmail(e.target.value)
    );

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => (
      setName(e.target.value)
    );

    return (
      <>
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
              onChange={handleChangeEmail}
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
                onChange={handleChangeName}
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
      </>
    );
  },
);
