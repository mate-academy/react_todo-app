import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_STATE_NEW_USER } from '../../constants/DEFAULT_STATE_NEW_USER';
import { reducerNewUser } from '../../reducer/ReducerNewUser';
import { ReducerNewUserType } from '../../enums/ReducerNewUserType';
import { Context } from '../../context';
import { Error } from '../../enums/Error';
import { addUser, getUser } from '../../api/user';
import { ErrorMessage } from '../ErrorMessage';
import { User } from '../../types/User';

export const RegForm: React.FC = memo(() => {
  const [newUser, dispatch] = useReducer(reducerNewUser,
    DEFAULT_STATE_NEW_USER);

  const { currentError, setCurrentError } = useContext(Context);

  const navigate = useNavigate();

  const [isDirtyEmail, setDirtyEmail] = useState(false);
  const [isDirtyName, setDirtyName] = useState(false);
  const [isDirtyId, setDirtyId] = useState(false);

  const [isSuccessId, setIsSuccessId] = useState(false);
  const [isSuccessName, setIsSuccessName] = useState(false);
  const [isSuccessEmail, setIsSuccessEmail] = useState(false);

  if (currentError) {
    window.setTimeout(() => setCurrentError(Error.RESET), 3000);
  }

  const addNewUser = async (user: User) => {
    await addUser(user);

    navigate('/auth');
  };

  const toCheckId = useCallback(() => {
    if (newUser.id === 0) {
      setCurrentError(Error.USERVALID);
      setDirtyId(true);

      return;
    }

    getUser(newUser.id)
      .then(() => {
        setCurrentError(Error.USERVALID);
        setDirtyId(true);
      })
      .catch(() => {
        setIsSuccessId(true);
      });
  }, [newUser.id]);

  const isValidName = useCallback(() => {
    if (!newUser.name.trim()) {
      setCurrentError(Error.NAME);
      setDirtyName(true);
      setIsSuccessName(true);

      return;
    }

    if (newUser.name.trim()) {
      setIsSuccessName(true);
    }
  }, [newUser.name]);

  const isValidEmail = useCallback(() => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!newUser.email.trim()) {
      setCurrentError(Error.EMAIL_EMPTY);
      setDirtyEmail(true);

      return;
    }

    if (!regex.test(newUser.email)) {
      setCurrentError(Error.EMAIL_WRONG);
      setDirtyEmail(true);

      return;
    }

    setIsSuccessEmail(true);
  }, [newUser.email]);

  const inputIdHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerNewUserType.ID,
      newID: +e.target.value.replace(/[^0-9]/g, ''),
    });
  }, [newUser.id]);

  const inputNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerNewUserType.NAME,
      newName: e.target.value.replace(/[^A-Za-z\s^А-яЁё]/gi, ''),
    });
  }, [newUser.name]);

  const inputEmailHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerNewUserType.EMAIL,
      newEmail: e.target.value,
    });
  }, [newUser.email]);

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();

    if (isSuccessEmail && isSuccessId && isSuccessName) {
      localStorage.setItem('userID', (newUser.id).toString());

      return addNewUser(newUser);
    }

    return setCurrentError(Error.CHECKFIELDS);
  };

  return (
    <>
      <form className="box" onSubmit={handleSumbit}>
        <div className="control has-icons-right">
          <h1 className="title">Registration</h1>
          <span className="icon is-large has-text-success  is-right">
            <i className="fa-brands fa-wpforms" />
          </span>
        </div>

        <div className="field">
          <label className="label">
            User ID
            <div className="control has-icons-left has-icons-right">
              <input
                className={classNames(
                  'input',
                  { 'is-success': isSuccessId },
                  { 'is-danger': isDirtyId },
                )}
                type="text"
                placeholder="Create your User ID"
                value={newUser.id}
                onFocus={() => {
                  setDirtyId(false);
                  setIsSuccessId(false);
                }}
                onBlur={toCheckId}
                onChange={inputIdHandler}
                required
              />

              <span className="icon is-small is-left">
                <i className="fa-sharp fa-solid fa-id-badge" />
              </span>

              {isDirtyId && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle fa-beat" />
                </span>
              )}

              {isSuccessId && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              )}
            </div>

            {isSuccessId && (
              <p className="help is-success">This ID is available</p>
            )}
          </label>
        </div>

        <div className="field">
          <label className="label">
            Name
            <div className="control has-icons-left has-icons-right">
              <input
                className={classNames(
                  'input',
                  { 'is-danger': isDirtyName },
                  { 'is-success': isSuccessName },
                )}
                type="text"
                placeholder="What is your Name?"
                value={newUser.name}
                onFocus={() => {
                  setDirtyName(false);
                  setIsSuccessName(false);
                }}
                onBlur={isValidName}
                onChange={inputNameHandler}
                required
              />

              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>

              {isSuccessName && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              )}

              {isDirtyName && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle fa-beat" />
                </span>
              )}
            </div>
          </label>
        </div>

        <div className="field">
          <label className="label">
            Email
            <div className="control has-icons-left has-icons-right">
              <input
                className={classNames(
                  'input',
                  { 'is-danger': isDirtyEmail },
                  { 'is-success': isSuccessEmail },
                )}
                type="email"
                placeholder="Email"
                value={newUser.email}
                onFocus={() => {
                  setDirtyEmail(false);
                  setIsSuccessEmail(false);
                }}
                onBlur={isValidEmail}
                onChange={inputEmailHandler}
                required
              />

              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>

              {isDirtyEmail && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle fa-beat" />
                </span>
              )}

              {isSuccessEmail && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              )}
            </div>
          </label>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className="button is-link"
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-link is-light"
              onClick={() => navigate('/auth')}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      {!!currentError && (
        <ErrorMessage
          currentError={currentError}
          setCurrentError={setCurrentError}
        />
      )}
    </>
  );
});
