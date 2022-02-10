import React, { useState } from 'react';
import { postUser } from '../../api/users/usersAPI';

import '../Auth/Auth.scss';

type Props = {
  backToAuth: () => void,
};

export const Registration: React.FC<Props> = ({ backToAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const createUser = () => {
    if (name.length > 2 && email.length > 5 && password.length > 7) {
      postUser(name, password, email);
      setName('');
      setPassword('');
      setEmail('');
      localStorage.setItem('test', password);
      backToAuth();
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
            type="text"
            id="log-email"
            value={email}
            className="Auth__input"
            placeholder="Minimum 6 letters"
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
            value={password}
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
      </form>
    </div>
  );
};
