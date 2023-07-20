import React from 'react';
import classNames from 'classnames';

export enum ErrorInput {
  NONE,
  EMAILERROR,
  NAMEERROR,
}

type FomrUserProps = {
  setUserEmail:React.Dispatch<React.SetStateAction<string>>;
  userEmail:string;
  formSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
  errorInput:ErrorInput;
  secVisIn:boolean;
  setUserName:React.Dispatch<React.SetStateAction<string>>;
  userName:string;
};

export const FormUser:React.FC<FomrUserProps> = ({
  setUserEmail,
  userEmail,
  formSubmit,
  errorInput,
  secVisIn,
  setUserName,
  userName,
}) => {
  return (
    <div className="form__block">
      <div className="form__content">
        <form className="form" onSubmit={(e) => formSubmit(e)}>
          {!secVisIn ? (
            <h1 className="form__title">Log in to open todos</h1>
          ) : (
            <h1 className="form__title">You need to register</h1>
          )}

          <div className="form__field">
            <label className="form__label" htmlFor="input-email">Email</label>
            <div className="form__input-block">
              <input
                type="email"
                className={classNames(
                  'form__input',
                  { error: errorInput === ErrorInput.EMAILERROR },
                )}
                placeholder="Enter your email"
                value={userEmail}
                id="input-email"
                onChange={(e) => setUserEmail(e.target.value)}
                required={false}
                disabled={secVisIn}
              />

              <span className="form__icon form__icon--envelope" />
            </div>
            {errorInput === ErrorInput.EMAILERROR && (
              <p className="form__error">Invalid address entered</p>
            )}
          </div>

          {secVisIn && (
            <div className="form__field">
              <label
                className="form__label"
                htmlFor="input-user"
              >
                Your Name
              </label>

              <div className="form__input-block">
                <input
                  type="text"
                  id="input-user"
                  className={classNames(
                    'form__input',
                    { error: errorInput === ErrorInput.NAMEERROR },
                  )}
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />

                <span className="form__icon form__icon--user" />
              </div>
              {errorInput === ErrorInput.NAMEERROR && (
                <p className="form__error">Invalid name</p>
              )}
            </div>
          )}

          <div className="form__field">
            <button
              type="submit"
              className="form__button"
            >
              {!secVisIn ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
      </div>

    </div>

  );
};
