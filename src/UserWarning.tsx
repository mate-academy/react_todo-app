import React, { FormEvent, useState } from 'react';
import { createUser, getUser } from './api/user';
import { User } from './types/User';
import { ErrorMessage } from './types/ErrorMessage';
import { ErrorNotification } from './components/ErrorNotification';

type Props = {
  setUserId: (userId: number) => void,
};

export const UserWarning: React.FC<Props> = ({
  setUserId,
}) => {
  const [mail, setMail] = useState('');
  const [hasError, setHasError] = useState<ErrorMessage>(ErrorMessage.NONE);
  const [users, setUsers] = useState<User[]>([]);
  const [userLoad, setUserLoad] = useState<User>();

  const fetchUser = async () => {
    try {
      const getData = await getUser(mail);

      setUsers(getData);
    } catch {
      setHasError(ErrorMessage.LOAD);
    }
  };

  const addUser = async () => {
    const newUser = {
      email: mail,
    };

    try {
      await createUser(newUser as User);
    } catch {
      setHasError(ErrorMessage.LOAD);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    addUser();
    fetchUser();
    setUserLoad(users?.find(user => user.email === mail));
    setUserId(userLoad?.id || 0);
  };

  const onCloseError = () => setHasError(ErrorMessage.NONE);

  return (
    <section className="section">
      <form className="box mt-5" onSubmit={handleSubmit}>
        <h1 className="title is-3">
          Log in to open todos
        </h1>
        <div className="control has-icons-left">
          <input
            type="email"
            id="user-email"
            className="input"
            placeholder="Enter your email"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>

        <div className="field mt-5">
          <button type="submit" className="button is-primary">
            Login
          </button>
        </div>
      </form>

      {hasError && (
        <ErrorNotification
          errorMessage={hasError}
          onCloseError={onCloseError}
        />
      )}
    </section>
  );
};
