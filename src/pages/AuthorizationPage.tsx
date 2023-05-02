import {
  FC,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

type Props = {
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthorizationPage: FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isUserNotFound, setIsUserNotFound] = useState<boolean>(false);
  const [errAuthorization, setErrAuthorization] = useState<boolean>(false);
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  const onAuthorizationSubmit = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const handleReceivedUser = (receivedUser: User) => {
      const user = {
        id: receivedUser.id,
        email: receivedUser.email,
        name: receivedUser.name,
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    };

    if (isUserNotFound) {
      client.post<User>('/users', { email, name })
        .then((result) => {
          handleReceivedUser(result);
        })
        .catch(() => {
          setErrAuthorization(true);
        });
    } else {
      client.get<User[]>(`/users?email=${email}`)
        .then((result) => {
          const user = result[0];

          if (user) {
            handleReceivedUser(user);
          } else {
            setIsUserNotFound(true);
            setIsDisabledInput(true);
          }
        })
        .catch(() => setErrAuthorization(true));
    }
  };

  return (
    <div className="todoapp authorization">
      <div className="todoapp__content authorization__content">
        Please, login to get yours todos

        <form
          method="post"
          onSubmit={(e) => onAuthorizationSubmit(e)}
          className="authorization__form"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              'input is-primary',
              'authorization__input',
            )}
            disabled={isDisabledInput}
          />

          {isUserNotFound && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={3}
              className={cn(
                'input is-primary',
                'authorization__input',
              )}
            />
          )}

          <button
            type="submit"
            onSubmit={onAuthorizationSubmit}
            className="button is-primary"
          >
            confirm
          </button>
        </form>

        {errAuthorization && (
          <p>Something went wrong with the authorization.</p>
        )}
      </div>

    </div>
  );
};
