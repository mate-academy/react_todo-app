import 'bulma';
import classNames from 'classnames';
import { useState } from 'react';
import { response } from '../../api/api';
import { User } from '../../types/User';

type Props = {
  setUser: (userId: number) => void,
};

export const Modal: React.FC<Props> = ({ setUser }) => {
  const [isActive, setIsActive] = useState(true);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);

  const [oldUsername, setOldUsername] = useState('');
  const [notFoundUser, setNotFoundUser] = useState(false);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name && username && email && phone) {
      response('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          phone,
        }),
      },
      setUser);
      setIsActive(false);
    }
  };

  const clickHandler = (searchingUser: string) => {
    response('/users')
      .then((users) => users.find(
        (user: User) => user.username === searchingUser,
      ))
      .then((users) => {
        setNotFoundUser(false);
        setUser(users.id);
        setIsActive(false);
      })
      .catch(() => setNotFoundUser(true));
  };

  return (
    <div className={classNames(
      'modal',
      { 'is-active': isActive },
    )}
    >
      <div className="modal-background" />
      <div className="modal-content">
        <article className="message">
          <div className="message-header">
            <p>Please, choose a user or create your own</p>
          </div>
          <div className="message-body">
            <p className="subtitle">
              Create your User
            </p>

            <form onSubmit={submitHandler}>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-smile" />
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    #
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Mobile phone"
                    value={phone}
                    onChange={(event) => setPhone(Number(event.target.value))}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-phone" />
                  </span>
                </p>
              </div>
              <button
                type="submit"
                className="button is-primary is-medium is-fullwidth"
              >
                Create and Continue
              </button>
            </form>

            <p className="subtitle">
              or Find your User
            </p>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  value={oldUsername}
                  onChange={(event) => setOldUsername(event.target.value)}
                />
                <span className="icon is-small is-left">
                  #
                </span>
              </p>
            </div>
            {notFoundUser && (
              <p>Sorry, we couldn`t find the user</p>
            )}
            <button
              type="button"
              className="button is-link"
              onClick={() => clickHandler(oldUsername)}
            >
              Find User
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
