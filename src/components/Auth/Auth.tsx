import React, { useState } from 'react';
import { Registration } from '../Registration';
import './Auth.scss';

type Props = {
  handlerLogin: (email: string, password: string) => void,
  waitingNewUser: () => void,
};

export const Auth: React.FC<Props> = ({ handlerLogin, waitingNewUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [opennerRegistr, setOpennerRegistr] = useState(false);

  const backToAuth = () => {
    setOpennerRegistr(!opennerRegistr);
    waitingNewUser();
  };

  const constolLogin = () => {
    if (email.length > 3 && password.length > 4) {
      handlerLogin(email, password);
      setPassword('');
      setEmail('');
    } else {
      // eslint-disable-next-line no-console
      console.log('error');
    }
  };

  return (
    <div className="Auth">
      {opennerRegistr
        ? <Registration backToAuth={backToAuth} />
        : (
          <form className="Auth__form">
            <label
              htmlFor="log-email"
              className="Auth__label"
            >
              <span>Email</span>
              <input
                type="text"
                id="log-email"
                value={email}
                className="Auth__input"
                placeholder="Minimum 3 letters"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label
              htmlFor="log-password"
              className="Auth__label"
            >
              <span>Password</span>
              <input
                type="password"
                id="log-password"
                className="Auth__input"
                value={password}
                placeholder="Minimum 8 letters"
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button
              type="button"
              className="Auth__btn"
              onClick={() => constolLogin()}
            >
              LOGIN
            </button>

            <button
              type="button"
              className="Auth__btn"
              onClick={() => setOpennerRegistr(!opennerRegistr)}
            >
              REGISTRATION
            </button>
          </form>
        )}
    </div>
  );
};
