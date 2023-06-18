import React, { useState } from 'react';
import { Users } from './types/Users';
import { addUser, getUser } from './api/users';

interface Props {
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
}

export const UserWarning: React.FC<Props> = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [register, setIsRegister] = useState(false);

  function loadUser(user: Users) {
    setUser(user);

    localStorage.setItem('user', JSON.stringify(user));
  }

  function handleAddUser() {
    return addUser({ email, name })
      .then(loadUser)
      .catch(() => {
        setError('Unable a create User');
      });
  }

  function handleCheck() {
    return getUser(email)
      .then((user) => {
        if (user) {
          loadUser(user);
        } else {
          setIsRegister(true);
        }
      })
      .catch(() => {
        setError('Unable a create User');
      });
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (register) {
      await handleAddUser();
    } else {
      await handleCheck();
    }
  };

  return (
    <section className="section">
      <div className="section__register">
        <form onSubmit={handleFormSubmit} className="section__form">
          <h1 className="section__title">{register ? 'Register' : 'USERID'}</h1>

          <input
            className="section__input"
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!register && error && (
            <div>
              <input
                className="section__input"
                type="text"
                name="Name"
                id="userName"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {error && (
            <span className="is-danger help">
              {error}
            </span>
          )}

          <button type="submit">
            {register ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
};
