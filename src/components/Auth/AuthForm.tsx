import React, { useEffect, useState } from 'react';
import { createUser, getUserByEmail } from '../../api/users';
import { User } from '../../types/User';

export type Props = {
  onLogin: (user: User) => void,
};

export const AuthForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    const user = JSON.parse(userData) as User;

    onLogin(user);
  }, []);

  const loadUser = async () => {
    const user = await getUserByEmail(email);

    if (user) {
      saveUser(user);
    } else {
      setNeedToRegister(true);
    }
  };

  const registerUser = () => {
    return createUser({ name, email })
      .then(saveUser);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessage('');

    try {
      if (needToRegister) {
        await registerUser();
      } else {
        await loadUser();
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1 className="title">
        {needToRegister ? 'You need to register' : 'Log in to open todos'}
      </h1>

      <label className="label" htmlFor="user-email">
        Email
      </label>

      <div>
        <input
          type="email"
          id="user-email"
          className="input"
          placeholder="Enter your email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {!needToRegister && errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      {needToRegister && (
        <div>
          <label className="label" htmlFor="user-name">
            Your Name
          </label>

          <div>
            <input
              type="text"
              id="user-name"
              className="input"
              placeholder="Enter your name"
              required
              minLength={4}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {needToRegister && errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="form-button"
      >
        {needToRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
};
