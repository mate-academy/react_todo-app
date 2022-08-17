import React, {
  useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getUser } from './api';
import { FormInput } from './FormInput';
import { Loader } from './Loader';
import './styles/LoginForm.scss';
import { TodosContext } from './TodosProvider';

export const LoginForm = React.memo(() => {
  const [isMember, setIsMember] = useState(true);
  const [username, setUsername] = useState('');
  const [errorUsername, setErrorUsername] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  const [isError, setIsError] = useState(false);

  const { setTodos, setUserId } = useContext(TodosContext);

  const navigate = useNavigate();

  useEffect(() => {
    setTodos([]);
    localStorage.clear();
  }, []);

  return (
    <>
      {!isLoad ? (
        <div className="form">
          <h2 className="form__title">
            {isMember ? ('Account login') : ('Register account')}
          </h2>
          <form
            className="form__field"
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            {isMember ? (
              <FormInput
                type="text"
                name="username"
                placeholder="Username"
                onSubmit={setUsername}
                onError={setIsError}
              />
            ) : (
              <>
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Name"
                  onSubmit={setName}
                  onError={setIsError}
                />
                <FormInput
                  type="text"
                  name="username"
                  placeholder="Username"
                  onSubmit={setUsername}
                  onError={setIsError}
                />
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  onSubmit={setEmail}
                  onError={setIsError}
                />
                <FormInput
                  type="phone"
                  name="phone"
                  placeholder="Phone"
                  onSubmit={setPhone}
                  onError={setIsError}
                />
              </>
            )}
            <button
              onClick={() => {
                if (isMember) {
                  if (!username) {
                    setIsError(true);

                    return false;
                  }

                  setIsError(false);
                  setIsLoad(true);

                  getUser(username)
                    .then(user => {
                      setErrorUsername(false);
                      setUserId(user[0].id);
                      navigate(`/${user[0].username}/`);
                    })
                    .catch(() => {
                      setErrorUsername(true);
                      setIsLoad(false);
                    });
                } else if (!username || !name || !phone || !email) {
                  setIsError(true);

                  return false;
                } else {
                  setIsLoad(true);
                  getUser(username).then(users => {
                    if (users.length < 1) {
                      throw new Error('No user');
                    }

                    setErrorUsername(true);
                    setIsLoad(false);
                  })
                    .catch(() => {
                      createUser(name, username, email, phone).then(user => {
                        setUserId(user.id);
                        navigate(`/${user.username}`);
                        setIsLoad(true);
                        setTodos([]);
                      });
                    });
                }

                setIsError(false);

                return true;
              }}
              className="form__button"
              type="button"
            >
              {isMember ? ('Login') : ('Register')}
            </button>
            <div className="form__error">
              {isError && !isMember ? ('Please fill in all the fields') : (
                <>
                  {errorUsername && isMember && ('There is no such user')}
                  {errorUsername && !isMember && (
                    'This username has already been used')}
                </>
              )}
            </div>
            <div className="form__register">
              {isMember ? ('Not ') : ('Is ')}
              a member ?
              {' '}
              <button
                className="form__change"
                type="button"
                onClick={() => {
                  setIsError(false);
                  setIsMember(prevState => !prevState);
                  setErrorUsername(false);
                  setUsername('');
                }}
              >
                {isMember ? ('Join') : ('Log in')}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
});
