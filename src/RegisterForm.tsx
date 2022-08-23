import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getUser } from './api';
import { FormInput } from './FormInput';
import { Loader } from './Loader';
import './styles/LoginForm.scss';
import { TodosContext } from './TodosProvider';
import { User } from './types/User';

type Props = {
  onSetTypeForm: React.Dispatch<React.SetStateAction<boolean>>,
};

export const RegisterForm: React.FC<Props> = React.memo(({ onSetTypeForm }) => {
  const [errorUsername, setErrorUsername] = useState(false);
  const initialUser = useMemo(() => ({
    username: '',
    name: '',
    email: '',
    phone: '',
  }), []);
  const [user, setUser] = useState<User>(initialUser);

  const {
    username, name, email, phone,
  } = useMemo(() => user, [user]);

  const [isLoad, setIsLoad] = useState(false);

  const [isError, setIsError] = useState(false);

  const { setTodos, setUserId } = useContext(TodosContext);

  const navigate = useNavigate();

  const handlerRegister = () => {
    setIsLoad(true);
    getUser(username).then(users => {
      if (users.length < 1) {
        throw new Error('No user');
      }

      setErrorUsername(true);
      setIsLoad(false);
    })
      .catch(() => {
        if (name && phone && email) {
          setIsError(false);
          createUser(name, username, email, phone).then(createdUser => {
            setUserId(createdUser.id);
            navigate(`/${createdUser.username}/`);
            setIsLoad(true);
            setTodos([]);
          });
        } else {
          throw new Error('Failed to create user');
        }
      })
      .catch(() => {
        setErrorUsername(true);
        setIsLoad(false);
      });
  };

  if (isLoad) {
    return <Loader />;
  }

  return (
    <div className="form">
      <h2 className="form__title">
        Account login
      </h2>
      <form
        className="form__field"
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        {Object.entries(user).map(([inputName, inputValue]) => {
          const placeholder = inputName[0].toUpperCase()
            + inputName.slice(1);

          return (
            <FormInput
              key={inputName}
              type="text"
              name={inputName}
              placeholder={placeholder}
              startValue={inputValue}
              onSubmit={setUser}
              onError={setIsError}
            />
          );
        })}
        <button
          onClick={() => {
            if (!username || !name || !phone || !email) {
              setIsError(true);

              return false;
            }

            handlerRegister();
            setIsError(false);

            return true;
          }}
          className="form__button"
          type="button"
        >
          Register
        </button>
        <div className="form__error">
          {isError && ('Please fill in all the fields')}
          {errorUsername && !isError
            && ('This username has already been used')}
        </div>
        <div className="form__register">
          Is a member ?
          {' '}
          <button
            className="form__change"
            type="button"
            onClick={() => {
              onSetTypeForm(true);
            }}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
});
