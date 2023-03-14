import React from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { Field } from '../Field';
import { createUser } from '../../api/users';
import { warningTimer } from '../../utils/warningTimer';

type Props = {
  user: User,
  setUser: (user: User) => void;
  setError: (error: boolean) => void;
};

export const UserWarning: React.FC<Props> = ({ user, setUser, setError }) => {
  const {
    name: nickName,
    username,
    email,
    phone,
  } = user;
  const isFieldsFilled = nickName && username && email && phone;

  const isDisabledButton = !isFieldsFilled;

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nickName || !username || !email || !phone) {
      return;
    }

    try {
      const userData = await createUser(user);

      setUser(userData);
    } catch (error) {
      setError(true);
      warningTimer(setError, false, 3000);
    }
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <h1>
        Login
      </h1>
      <Field
        name="name"
        type="text"
        value={nickName}
        onChange={handleChangeEvent}
        required
      />

      <Field
        name="username"
        type="text"
        value={username}
        onChange={handleChangeEvent}
        required
      />

      <Field
        name="email"
        type="email"
        value={email}
        onChange={handleChangeEvent}
        required
      />

      <Field
        name="phone"
        type="text"
        value={phone}
        onChange={handleChangeEvent}
        required
      />

      <div className="field">
        <button
          type="submit"
          className={classNames(
            'button',
            { 'is-disabled': isDisabledButton },
          )}
          disabled={isDisabledButton}
        >
          Register
        </button>
      </div>
    </form>
  );
};
