import React,
{
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { getUser, getUsers } from '../../api/user';
import { Context } from '../../context';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Error } from '../../enums/Error';
import { ErrorMessage } from '../ErrorMessage';
import { User } from '../../types/User';
import { Notification } from '../Notification/Notification';

export const Auth: React.FC = React.memo(() => {
  const {
    setUser,
    currentError,
    setCurrentError,
  } = useContext(Context);

  const navigate = useNavigate();

  const [value, setValue] = useLocalStorage('userID', '');
  const [arrayOfUsers, setArrayOfUsers] = useState<User[]>([]);
  const [isLoading, setIsLoadig] = useState(false);

  const toGetRandomID = useCallback(() => {
    const rand = Math.floor(Math.random() * arrayOfUsers.length);

    return arrayOfUsers[rand].id;
  }, [arrayOfUsers]);

  useEffect(() => {
    getUsers().then(setArrayOfUsers);
  }, []);

  useEffect(() => {
    if (currentError) {
      window.setTimeout(() => {
        setCurrentError(Error.RESET);
      }, 3000);
    }
  }, [currentError]);

  const toLogIn = async () => {
    await getUser(+value)
      .then(setUser)
      .then(() => {
        navigate(`/todos/${value}`);
      })
      .catch(() => {
        navigate('/auth');
        setValue('');
        setIsLoadig(false);
        setCurrentError(Error.USER);
      })
      .finally(() => {
        setIsLoadig(false);
      });
  };

  const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value.replace(/[^0-9]/g, ''));

    setIsLoadig(false);
    setCurrentError(Error.RESET);
  }, [value]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadig(true);

    if (value.length < 4 || value.length > 10) {
      setCurrentError(Error.USERVALID);
      setValue('');
      setIsLoadig(false);

      return;
    }

    toLogIn();
  }, [value, currentError]);

  return (
    <>
      <form className="box mt-5" onSubmit={onSubmit}>
        <div className="field">
          <p>Try your User ID!</p>
          <div className="control has-icons-left">
            <input
              type="text"
              className="input"
              value={value}
              disabled={isLoading}
              onChange={inputHandler}
            />

            <span className="icon is-medium is-left">
              <i className={classNames(
                'fa-regular fa-id-badge',
                { 'fa-fade': !isLoading },
              )}
              />
            </span>
          </div>
        </div>
        <div className="field is-flex is-justify-content-space-between">
          <button
            type="submit"
            disabled={!!currentError}
            className={classNames(
              'button',
              'is-rounded',
              { 'is-loading': isLoading },
            )}
          >
            Log In
          </button>

          <button
            type="button"
            className={classNames(
              'button',
              'is-primary',
              'is-rounded',
            )}
            onClick={() => setValue(toGetRandomID())}
          >
            Random ID
          </button>
        </div>
      </form>
      <Notification />

      {!!currentError
          && (
            <ErrorMessage
              currentError={currentError}
              setCurrentError={setCurrentError}
            />
          )}
    </>
  );
});
