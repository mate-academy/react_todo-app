import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getTodos, getUser } from './api';
import { Loader } from './Loader';
import './styles/LoginForm.scss';
import { TodosContext } from './TodosProvider';

export const LoginForm = () => {
  const [isMember, setIsMember] = useState(true);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const {
    isLoad, setIsLoad, setTodos, setUserId,
  } = useContext(TodosContext);
  const navigate = useNavigate();

  return (
    <>
      {!isLoad ? (
        <div className="form">
          <h2 className="form__title">
            {isMember ? ('Account login') : ('Register account')}
          </h2>
          <form className="form__field" method="post">
            {!isMember && (
              <label>
                <input
                  value={name}
                  onChange={event => {
                    setName(event.target.value);
                  }}
                  className="form__input"
                  type="text"
                  name="name"
                  placeholder="Name"
                />
              </label>
            )}
            <label>
              <input
                value={username}
                onChange={event => {
                  setUsername(event.target.value);
                }}
                className="form__input"
                type="text"
                name="username"
                placeholder="Username"
              />
            </label>
            {!isMember && (
              <>
                <label>
                  <input
                    value={email}
                    onChange={event => {
                      setEmail(event.target.value);
                    }}
                    className="form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  />
                </label>
                <label>
                  <input
                    value={phone}
                    onChange={event => {
                      setPhone(event.target.value);
                    }}
                    className="form__input"
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                  />
                </label>
              </>
            )}
            <button
              onClick={() => {
                if (isMember) {
                  if (!username) {
                    setIsEmptyInput(true);

                    return false;
                  }

                  setIsEmptyInput(false);
                  setIsLoad(true);

                  getUser(username).then(user => {
                    setErrorUsername(false);
                    navigate(`/${user[0].username}`);
                    setUserId(user[0].id);
                    getTodos(user[0].id).then(todos => {
                      setTodos(todos);
                      setIsLoad(false);
                    });
                  }).catch(() => {
                    setErrorUsername(true);
                    setIsLoad(false);
                  });
                } else if (!username || !name || !phone || !email) {
                  setIsEmptyInput(true);

                  return false;
                } else {
                  getUser(username).then(users => {
                    if (users.length < 1) {
                      throw new Error('No user');
                    }

                    setErrorUsername(true);
                  })
                    .catch(() => {
                      createUser(name, username, email, phone).then(user => {
                        navigate(`/${user.username}`);
                        setUserId(user.id);
                        setIsLoad(false);
                        setTodos([]);
                      });
                    });
                }

                setIsEmptyInput(false);

                return true;
              }}
              className="form__button"
              type="button"
            >
              {isMember ? ('Login') : ('Register')}
            </button>
            <div className="form__error">
              {isEmptyInput ? ('Please fill in all the fields') : (
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
                  setIsEmptyInput(false);
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
};
