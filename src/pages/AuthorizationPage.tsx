import {
  FC,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';
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
          }
        })
        .catch(() => setErrAuthorization(true));
    }
  };

  return (
    <div className='todoapp authorization'>
      <div className="todoapp__content authorization__content">
        Please, login to get yours todos

        <form
          method="post"
          onSubmit={(e) => onAuthorizationSubmit(e)}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {isUserNotFound && (
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={3}
            />
          )}

          <button type="submit" onSubmit={onAuthorizationSubmit}>
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
