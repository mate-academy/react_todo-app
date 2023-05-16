/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import './styles/login.scss';
import { createUser } from './api/user';
import { Notification } from './components/Notification';
import { Loader } from './components/Loader';
import { Errors } from './types/Errors';

type Props = {
  setNewUserId: (id: number | null) => void;
  typeOfError: Errors;
  setTypeOfError: (val: Errors) => void;
  removeNotification: () => void;
};

export const UserLogIn: React.FC<Props> = ({
  setNewUserId, removeNotification, typeOfError, setTypeOfError,
}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const newUser = { name, username, email };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTypeOfError(Errors.None);
    setLoading(false);

    try {
      setLoading(true);
      const userFromServer = await createUser(newUser);

      setNewUserId(userFromServer.id || null);
    } catch (error) {
      setTypeOfError(Errors.Login);
    } finally {
      setLoading(false);
      setName('');
      setUsername('');
      setEmail('');
    }
  };

  return (
    <section className="section login">
      <p className="login__text">Log in to continue...</p>
      <form className="login__form">
        <label htmlFor="name" className="login__label">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="login__input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="username" className="login__label">
          Username:
        </label>
        <input
          id="username"
          type="text"
          className="login__input"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email" className="login__label">
          E-mail:
        </label>
        <input
          id="email"
          type="email"
          className="login__input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {isLoading
          ? (
            <Loader />
          )
          : (
            <button
              type="submit"
              className="login__submit"
              onClick={handleSubmit}
              disabled={name === '' || username === '' || email === ''}
            >
              Log in
            </button>
          )}
      </form>

      {typeOfError === Errors.Login && (
        <Notification
          typeOfError={Errors.Login}
          removeNotification={removeNotification}
        />
      )}
    </section>
  );
};
