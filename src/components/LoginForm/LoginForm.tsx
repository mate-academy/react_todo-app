import { useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { User } from '../../types/User';
import { addUser, getUser } from '../../api/user';

type Props = {
  setUser: (user: User) => void;
};

export const LoginForm: React.FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string>('');
  const [wasUserNotFound, setWasUserNotFound] = useState<boolean>(false);

  const signInUser = async () => {
    try {
      const usersFromServer = await getUser(email);

      if (!usersFromServer.length) {
        setWasUserNotFound(true);
        setError('User was not found! Please register!');
      }

      setUser(usersFromServer[0]);
    } catch {
      setError('Unable to load user\'s information!');
    }
  };

  const signUpUser = async () => {
    try {
      const newUser: Omit<User, 'id'> = { email, name };
      const newCreatedUser = await addUser(newUser);

      setUser(newCreatedUser);
    } catch {
      setError('Unable to register a new user!');
    } finally {
      setWasUserNotFound(false);
    }
  };

  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (wasUserNotFound) {
      signUpUser();
    } else {
      signInUser();
    }
  };

  return (
    <>
      <section className="login-form">
        <h1 className="login-form__header">
          {wasUserNotFound
            ? 'Please sign up'
            : 'Please sign in'}
        </h1>

        <form
          method="POST"
          className="login-form__form"
          onSubmit={handleSubmission}
        >
          <div className="login-form__item">
            <label htmlFor="email" className="login-form__label">
              Enter your email:
            </label>

            <img
              src="./icons/email.png"
              alt="Envelope"
              className="login-form__input-icon"
            />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="login-form__input"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value.trim());
              }}
            />
          </div>

          {wasUserNotFound
            ? (
              <>
                <div className="login-form__item">
                  <label htmlFor="name" className="login-form__label">
                    Enter your name:
                  </label>

                  <img
                    src="./icons/person.png"
                    alt="Person"
                    className="login-form__input-icon"
                  />

                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="login-form__input"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value.trim());
                    }}
                  />
                </div>

                <button
                  className="login-form__button"
                  type="submit"
                  disabled={!email.trim() || !name.trim()}
                >
                  Sign up
                </button>
              </>
            )
            : (
              <button
                className="login-form__button"
                type="submit"
                disabled={!email.trim()}
              >
                Sign in
              </button>
            )}

        </form>
      </section>

      {error && (
        <ErrorMessage
          error={error}
          setError={setError}
        />
      )}
    </>
  );
};
