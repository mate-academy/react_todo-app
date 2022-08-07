import 'bulma';
import classNames from 'classnames';
import { useState } from 'react';
import { response } from '../../api/api';
import { User } from '../../types/User';

type Props = {
  setUser: (value: User | null) => void,
};

export const Modal: React.FC<Props> = ({ setUser }) => {
  const [isActive, setIsActive] = useState(true);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [oldUsername, setOldUsername] = useState('');
  const [notFoundUser, setNotFoundUser] = useState(false);

  const submitHandlerCreate = (event: React.SyntheticEvent) => {
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
      }).then((user: User) => {
        setUser({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
        });
        setIsActive(false);
      });
    }
  };

  const submitHandlerFind = (
    event: React.SyntheticEvent,
    searchingUser: string,
  ) => {
    event.preventDefault();

    response('/users')
      .then((users) => users.find(
        (user: User) => user.username === searchingUser,
      ))
      .then((user) => {
        setUser({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
        });

        setNotFoundUser(false);
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
            <p className="title has-text-light">
              Please, choose a user or create your own
            </p>
          </div>
          <div className="message-body">
            <p className="subtitle">
              Create your User
            </p>

            <form onSubmit={(event) => submitHandlerCreate(event)}>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
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
                    required
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
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
                    type="tel"
                    pattern="+([0-9]{3})-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                    placeholder="Mobile phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-phone" />
                  </span>
                </p>
                <div className="help">format: +(098)-545-52-23</div>
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

            <form onSubmit={(event) => submitHandlerFind(event, oldUsername)}>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username"
                    value={oldUsername}
                    onChange={(event) => setOldUsername(event.target.value)}
                    required
                  />
                  <span className="icon is-small is-left">
                    #
                  </span>
                </p>
              </div>
              {notFoundUser && (
                <p className="help has-text-danger">
                  Sorry, we couldn`t find the user
                </p>
              )}
              <button
                type="submit"
                className="button is-link is-fullwidth is-medium"
              >
                Find User
              </button>
            </form>
          </div>
        </article>
      </div>
    </div>
  );
};
