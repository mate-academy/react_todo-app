import React, { useState, useEffect, useMemo } from 'react';
import { Registration } from '../Registration';
import { Notification } from '../Notification';
import './Auth.scss';

type Props = {
  handlerLogin: (email: string, password: string) => void,
  waitingNewUser: () => void,
  foundUser: User | undefined,
  filterEmailUsers: string[],
};

export const Auth: React.FC<Props> = ({
  handlerLogin,
  waitingNewUser,
  foundUser,
  filterEmailUsers,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [opennerRegistr, setOpennerRegistr] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  useMemo(() => {
    setOpenNotif(false);
  }, [email, password]);

  const backToAuth = () => {
    setOpennerRegistr(!opennerRegistr);
    setPassword('');
    setEmail('');
    setOpenNotif(false);
    waitingNewUser();
  };

  const controlLogin = () => {
    if (email.length > 3 && password.length > 4) {
      handlerLogin(email, password);
      setOpenNotif(true);
    } else {
      setOpenNotif(true);
    }
  };

  useEffect(() => {
    setPassword('');
    setEmail('');
  }, [foundUser]);

  return (
    <div className="Auth">
      {opennerRegistr
        ? (
          <Registration
            backToAuth={backToAuth}
            handlerLogin={handlerLogin}
            filterEmailUsers={filterEmailUsers}
          />
        )
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
                min={3}
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
              onClick={() => controlLogin()}
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
            {openNotif && (!foundUser && <Notification message="Incorrect login or password" />) }
          </form>
        )}
    </div>
  );
};
