import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from './api';
import { FormInput } from './FormInput';
import { Loader } from './Loader';
import './styles/LoginForm.scss';
import { TodosContext } from './TodosProvider';
import { User } from './types/User';

type Props = {
  onSetTypeForm: React.Dispatch<React.SetStateAction<boolean>>,
};

export const SingInForm: React.FC<Props> = React.memo(({ onSetTypeForm }) => {
  const [errorUsername, setErrorUsername] = useState(false);
  const [{ username }, setUser] = useState<User>({ username: '' });

  const [isLoad, setIsLoad] = useState(false);

  const [isError, setIsError] = useState(false);

  const { setUserId } = useContext(TodosContext);

  const navigate = useNavigate();

  const handlerLogin = () => {
    setIsError(false);
    setIsLoad(true);

    getUser(username)
      .then(users => {
        setErrorUsername(false);
        setUserId(users[0].id);
        navigate(`/${users[0].username}/`);
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
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          startValue={username}
          onSubmit={setUser}
          onError={setIsError}
        />
        <button
          onClick={() => {
            if (!username) {
              setIsError(true);

              return false;
            }

            handlerLogin();

            return true;
          }}
          className="form__button"
          type="button"
        >
          Login
        </button>
        <div className="form__error">
          {isError && ('Please fill in the field')}
          {errorUsername && !isError && ('There is no such user')}
        </div>
        <div className="form__register">
          Not a member ?
          {' '}
          <button
            className="form__change"
            type="button"
            onClick={() => {
              onSetTypeForm(false);
            }}
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
});
