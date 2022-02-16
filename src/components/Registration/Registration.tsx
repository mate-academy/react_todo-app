import React, { useState, useMemo } from 'react';
import { postUser } from '../../api/users/usersAPI';
import { Notification } from '../Notification';

import '../Auth/Auth.scss';

type Props = {
  backToAuth: () => void,
  handlerLogin: (email: string, password: string) => void,
  filterEmailUsers: string[],
};

export const Registration: React.FC<Props> = ({ backToAuth, handlerLogin, filterEmailUsers }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setPassword] = useState('');
  const [name, setName] = useState('');
  const [opennerMessage, setOpennerMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useMemo(() => {
    setOpennerMessage(false);
  }, [newEmail, newPassword, name]);

  const createUser = () => {
    const checkNewEmail = filterEmailUsers.some(email => email === newEmail);

    const validatedName = name.length > 2;
    const validatedEmailLength = newEmail.length > 5;
    const validatedEmailType = newEmail.includes('@gmail.com')
      || newEmail.includes('@mail.com') || newEmail.includes('@gmail.ru') || newEmail.includes('@mail.ru');

    const validated = validatedName
      && validatedEmailLength && newPassword.length > 7 && !checkNewEmail && validatedEmailType;

    if (validated) {
      (async () => {
        await postUser(name, newPassword, newEmail);
        handlerLogin(newEmail, newPassword);
        backToAuth();
      })();
    } else {
      setOpennerMessage(true);
    }

    if (name.length < 3) {
      setErrorMessage('Enter name min 3 letters');
    } else if (newEmail.length < 5) {
      setErrorMessage('Enter Email min 6 letters');
    } else if (newPassword.length < 8) {
      setErrorMessage('Enter Password min 8 letters');
    } else if (checkNewEmail) {
      setErrorMessage('This email is used');
    } else if (!validatedEmailType) {
      setErrorMessage('Example mail xxxx@gmail.com');
    }
  };

  return (
    <div>
      <form className="Auth__form">
        <label
          htmlFor="log-name"
          className="Auth__label"
        >
          <span>Name</span>
          <input
            type="text"
            id="log-name"
            value={name}
            className="Auth__input"
            placeholder="Minimum 3 letters"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label
          htmlFor="log-email"
          className="Auth__label"
        >
          <span>Email</span>
          <input
            type="email"
            id="log-email"
            value={newEmail}
            className="Auth__input"
            placeholder="Minimum 6 letters"
            onChange={(event) => setNewEmail(event.target.value)}
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
            value={newPassword}
            className="Auth__input"
            placeholder="Minimum 8 letters"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="Auth__btn"
          onClick={() => createUser()}
        >
          CREATE
        </button>
        <button
          type="button"
          className="Auth__btn"
          onClick={() => backToAuth()}
        >
          SING IN
        </button>
        {opennerMessage && <Notification message={errorMessage} />}
      </form>
    </div>
  );
};
