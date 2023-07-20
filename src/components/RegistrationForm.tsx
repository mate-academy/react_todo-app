/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */

import classNames from 'classnames';
import React, { useState } from 'react';
import emailIcon from '../assests/icons/email.png';
import passwordIcon from '../assests/icons/password.png';
import { useLocalStorage } from '../utils/hooks/useLocalStorage';

type Props = {
  setShowForm: (boolean: boolean) => void,
};

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const RegistrationForm:React.FC<Props> = ({ setShowForm }) => {
  const [data, setData] = useLocalStorage('userData', {
    email: '',
    password: '',
  });

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState(false);

  const handleAddUser = () => {
    setTouched(true);
    if (EMAIL_REGEXP.test(user.email) && user.password.length) {
      setData({ ...data, ...user });
      setShowForm(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <h1 className="title">Login</h1>
        <div
          className="form"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddUser();
            }
          }}
        >
          <div className={classNames(
            'form__item',
            { 'is-danger': touched && !EMAIL_REGEXP.test(user.email) },
          )}
          >
            <input
              type="email"
              className="outline-none"
              placeholder="Enter your email"
              required
              defaultValue={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <img src={emailIcon} alt="email icon" width={28} />
          </div>
          <div className={classNames(
            'form__item',
            { 'is-danger': touched && !user.password.trim().length },
          )}
          >
            <input
              type="password"
              placeholder="Enter your password"
              className="outline-none"
              required
              defaultValue={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <img src={passwordIcon} alt="pasword icon" width={28} />
          </div>
          <button
            type="button"
            onClick={handleAddUser}
          >
            login

          </button>

        </div>
      </div>

    </>
  );
};
