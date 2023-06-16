import { FC, useState, FormEvent } from 'react';
import { User } from '../types/User';
import { ErrorMessage } from '../types/ErrorMessage';
import { ErrorNotification } from '../components/ErrorNotification';
import { createUser, getUser } from '../api/user';

type Props = {
  setUser: (newValue: User | null) => void;
};

export const AuthorizationPage: FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isUserNotFind, setIsUserNotFind] = useState(false);
  const [isError, setIsError] = useState<ErrorMessage>(ErrorMessage.None);

  const fetchUser = async () => {
    try {
      const getData = await getUser(email);

      if (!getData.length) {
        setIsUserNotFind(true);
        setIsError(ErrorMessage.LoadUser);
      }

      const user = getData.find(data => {
        return data.email === email && data.name !== '';
      });

      if (user) {
        setUser(user);
      }
    } catch (error) {
      setIsError(ErrorMessage.Login);
    }
  };

  const addUser = async () => {
    const newUser = {
      email,
      name,
    };

    try {
      await createUser(newUser as User);
    } catch {
      setIsError(ErrorMessage.Load);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isUserNotFind) {
      fetchUser();
    } else {
      await addUser();
      await fetchUser();
      setIsUserNotFind(false);
    }
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onCloseError = () => {
    setIsError(ErrorMessage.None);
  };

  return (
    <section className="section">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="box mt-5"
      >
        <h1 className="title is-3">
          {(isUserNotFind)
            ? 'You need to register'
            : 'Log in to open todos'}
        </h1>
        <div className="control has-icons-left">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputEmail}
            className="input is-primary"
            minLength={2}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>

        {isUserNotFind && (
          <div className="field">
            <label className="label" htmlFor="user-name">Your Name</label>
            <div className="control has-icons-left">
              <input
                type="text"
                name="name"
                id="user-name"
                className="input is-primary"
                placeholder="Enter your name"
                value={name}
                onChange={handleInputName}
                minLength={2}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
          </div>
        )}

        <div className="field mt-5">
          <button
            type="submit"
            className="button is-primary is-outlined"
            disabled={!email.trim()}
          >
            {(isUserNotFind) ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </form>

      {isError && (
        <ErrorNotification
          errorMessage={isError}
          closeError={onCloseError}
        />
      )}
    </section>
  );
};
