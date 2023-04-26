/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import {
  getAllUsers, LoadUserTodos,
  deleteTodo, createTodo, updateTodo, createUser, deleteUser,
} from '../api/users';
import { CloudTodo } from '../types/CloudTodo';
import { CloudUser } from '../types/CloudUser';

export const CloudTodos: React.FC = () => {
  const [loadedTodos, setLoadedTodos] = useState<CloudTodo[]>([]);
  const [emailIdInput, setEmailIdInput] = useState('');
  const [newTodoInput, setNewTodoInput] = useState('');
  const [editableId, setEditableId] = useState<number>();
  const [editableTitle, setEditableTitle] = useState('');
  const [mainUserId, setMainUserId] = useState<number>();
  const [mainEmail, setMainEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState<CloudUser[]>([]);
  const [UnknownUserError, setUnknownUserError] = useState(false);
  const location = useLocation();
  const [newUserObj, setNewUserObj] = useState({
    name: '',
    phone: '',
    nickname: '',
  });
  const [adminAccess, setAdminAccess] = useState(false);
  const [adminKeyInvalid, setAdminKeyInvalid] = useState(false);
  const [regFormErrors, setRegFormErrors] = useState({
    userName: false,
    email: true,
  });
  /* stage 0 - loginCheck - checking if valid login stored in session memory
     stage 1 - if login valid - todos from server showed up
     stage 2 - if login absent - input form waits for an email input
     stage 3 - if input is valid - jumps to stage 1, if not - reg new user appears
  */

  let vaultForEmail = ''; // sync email storage between dif forms instead of async states

  function getTodosOfUser() {
    if (mainUserId) {
      LoadUserTodos(mainUserId)
        .then(res => res.json())
        .then(userTodos => {
          setLoadedTodos(userTodos);
        })
        .catch((error) => ({
          Response: 'False',
          Error: error,
        }));
    }
  }

  const makeThisEditable = (todoId:number, todoTitle:string) => {
    setEditableId(todoId);
    setEditableTitle(todoTitle);
  };

  const editableTodoHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(event.target.value);
  };

  function getUsersFromServer() {
    getAllUsers()
      .then(res => res.json())
      .then(users => {
        if (users.length > 0) {
          setLoadedUsers(users);

          const searchRes = users
            .find((user:CloudUser) => user.email === mainEmail
              && user.email.length > 0);

          if (searchRes) {
            setMainUserId(searchRes.id);
            sessionStorage.setItem('todosUserId', searchRes.id);
          }
        }
      })
      .catch((error) => ({
        Response: 'False',
        Error: error,
      }));
  }

  useEffect(() => {
    if (mainUserId) {
      LoadUserTodos(Number(mainUserId))
        .then(res => res.json())
        .then(userTodos => {
          setLoadedTodos(userTodos);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => ({
          Response: 'False',
          Error: error,
        }));
    }
  }, [mainUserId]);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('todosUserEmail');
    const savedID = sessionStorage.getItem('todosUserId');

    if (loadedUsers.length === 0) {
      getUsersFromServer();
    }

    if (savedEmail !== null) { // case when EMAIL IS VALID
      setLoading(true);
      setMainEmail(savedEmail);
      setMainUserId(Number(savedID));
      LoadUserTodos(Number(savedID))
        .then(res => res.json())
        .then(userTodos => {
          setLoadedTodos(userTodos);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => ({
          Response: 'False',
          Error: error,
        }));
    }
  }, []);

  const emailIdInputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailIdInput(event.target.value);
    setUnknownUserError(false);
    setRegFormErrors(prevState => ({ ...prevState, email: false }));
  };

  const submitNewEmailId = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // this is a part where You put your email only for authorization

    if (emailIdInput.length > 0) {
      const searchRes = loadedUsers
        .find((user:CloudUser) => user.email === emailIdInput);

      if (searchRes?.id) {
        setMainUserId(searchRes.id);
        setMainEmail(searchRes.email);
        sessionStorage.setItem('todosUserId', `${searchRes.id}`);
        sessionStorage.setItem('todosUserEmail', searchRes.email);

        setEmailIdInput('');
        const mainInput = document.querySelector('.new-todo') as HTMLElement;

        mainInput.blur();
        setUnknownUserError(false);
      } else {
        setUnknownUserError(true);
        sessionStorage.removeItem('todosUserId');
        sessionStorage.removeItem('todosUserEmail');
        setMainEmail('');
        setMainUserId(undefined);
        setLoadedTodos(([]));
      }
    }
  };

  const removeHandler = (todoId:number) => {
    deleteTodo(todoId)
      .then(() => {
        const savedID = sessionStorage.getItem('todosUserId');

        LoadUserTodos(Number(savedID))
          .then(res => res.json())
          .then(userTodos => {
            setLoadedTodos(userTodos);
          })
          .then(() => {
            setLoading(false);
          })
          .catch((error) => ({
            Response: 'False',
            Error: error,
          }));
      })
      .catch((error) => ({
        Response: 'False',
        Error: error,
      }));
  };

  const handleCompleted = (todoId: number, status: boolean) => {
    updateTodo(todoId, { completed: status })
      .then(() => {
        getTodosOfUser();
      })
      .catch((error) => ({
        Response: 'False',
        Error: error,
      }));
  };

  const handleBlur = () => {
    const editableTodo = loadedTodos
      .find((todo:CloudTodo) => todo.id === editableId);

    if (editableTodo) {
      if (editableTitle.length === 0) {
        removeHandler(editableTodo.id || 0); // 0 is a typegate workaround for TS
      } else {
        updateTodo(editableTodo.id || 0, { title: editableTitle })
          .then(() => {
            setEditableTitle('');
            setEditableId(0);
            getTodosOfUser();
          });
        // updates todo with new title and resets "editableId"
      }
    }

    setEditableTitle('');
    setEditableId(0);

    const editInput = document.querySelector('#editableTodo') as HTMLElement;

    if (editInput) {
      editInput.blur();
    }
  };

  useEffect(() => {
    if (editableId) {
      const editInput = document.querySelector('#editableTodo') as HTMLElement;

      if (editInput) {
        editInput.focus();
      }
    }
  }, [editableId]);

  const todoMarkup = (todo:CloudTodo) => {
    return todo.id === Number(editableId)
      ? (
        <li
          className="editing"
          key={todo.id}
          onBlur={handleBlur}
        >
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-editing" />
            <label>{editableTitle}</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input
            type="text"
            className="edit"
            id="editableTodo"
            value={editableTitle}
            onChange={editableTodoHandle}
          />
        </li>
      )
      : (
        <li
          key={todo.id}
          className={classNames({ completed: todo.completed })}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => handleCompleted(todo.id || 0, !todo.completed)}
            />
            <label onDoubleClick={() => makeThisEditable(
              todo.id || 0, todo.title,
            )}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => removeHandler(todo.id || 0)}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      );
  };

  const newTodoInputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoInput(event.target.value);
  };

  const handleNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoInput.length > 0 && mainUserId) {
      createTodo(newTodoInput, mainUserId)
        .then(() => {
          getTodosOfUser();
          setNewTodoInput('');
        })
        .catch((error) => ({
          Response: 'False',
          Error: error,
        }));
    }
  };

  const newUserInputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'name') {
      setRegFormErrors(prevState => ({ ...prevState, userName: false }));
    }

    setNewUserObj({ ...newUserObj, [event.target.name]: event.target.value });
  };

  const clearCompleted = () => {
    const completedTodos = loadedTodos.filter(todo => todo.completed)
      .map(todo => deleteTodo(todo.id || 0));

    Promise.all(completedTodos)
      .then(() => {
        const savedID = sessionStorage.getItem('todosUserId');

        LoadUserTodos(Number(savedID))
          .then(res => res.json())
          .then(userTodos => {
            setLoadedTodos(userTodos);
          });
      })
      .catch((error) => ({
        throw: `some of the tasks were not deleted properly, code: + ${error}`,
      }));
  };

  const ToggleAll = () => {
    if (!loadedTodos.find(todo => !todo.completed)) {
      const todosToUpdate = loadedTodos.map(todo => {
        return updateTodo(todo.id || 0, { completed: false });
      });

      Promise.all(todosToUpdate)
        .then(() => {
          const savedID = sessionStorage.getItem('todosUserId');

          LoadUserTodos(Number(savedID))
            .then(res => res.json())
            .then(userTodos => {
              setLoadedTodos(userTodos);
            });
        })
        .catch((error) => ({
          throw: `some of the tasks completion statuses were not updated properly, code: + ${error}`,
        }));
    } else {
      const todosToUpdate = loadedTodos.map(todo => {
        return updateTodo(todo.id || 0, { completed: true });
      });

      Promise.all(todosToUpdate)
        .then(() => {
          const savedID = sessionStorage.getItem('todosUserId');

          LoadUserTodos(Number(savedID))
            .then(res => res.json())
            .then(userTodos => {
              setLoadedTodos(userTodos);
            });
        })
        .catch((error) => ({
          throw: `some of the tasks completion statuses were not updated properly, code: + ${error}`,
        }));
    }
  };
  // eslint-disable-next-line
  const _0xf8fc=["\x61\x64\x6D\x69\x6E"];

  let visualTodos = loadedTodos;

  if (location.pathname === '/cloud/active') {
    visualTodos = loadedTodos.filter((todo) => todo.completed === false);
  }

  if (location.pathname === '/cloud/completed') {
    visualTodos = loadedTodos
      .filter((todo) => todo.completed === true);
  }

  const openUserRegForm = () => {
    const newUserForm = document.querySelector('.new-user-form__wrapper');

    if (newUserForm) { // this is just for TS
      newUserForm.classList.add('visible');

      newUserForm.addEventListener('click', (e) => {
        const formMain = document.querySelector('.new-user-form__wrapper');

        if (e.target instanceof HTMLElement) {
          if (e.target === formMain) {
            newUserForm.classList.remove('visible');
          }
        }
      });
    }
  };

  const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match( // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ); // that`s an email mask validation ⬆
  };

  const tryRegNewUser = () => { // BUTTON handler at the bottom of NEW USER REG FORM
    const condition = validateEmail(emailIdInput);

    if (newUserObj.name.length < 4) {
      setRegFormErrors(prevState => ({ ...prevState, userName: true }));
    }

    if (!condition) {
      setRegFormErrors(prevState => ({ ...prevState, email: true }));
    }

    if (newUserObj.name.length < 4
      || !condition) {
      return;
    }

    createUser({ ...newUserObj, email: emailIdInput })
      .then((res) => {
        setMainEmail(res.email);
        vaultForEmail = res.email;
        setUnknownUserError(false);
      })
      .then(() => {
        getAllUsers()
          .then(res => res.json())
          .then(users => {
            if (users.length > 0) {
              setLoadedUsers(users);
              const searchRes = users
                .find((user:CloudUser) => user.email === vaultForEmail
                  && user.email.length > 0);

              if (searchRes) {
                setMainUserId(searchRes.id);
                sessionStorage.setItem('todosUserId', searchRes.id);
              }
            }
          })
          .then(() => {
            setEmailIdInput('');
            setNewUserObj({
              name: '',
              phone: '',
              nickname: '',
            });

            const newUserForm = document
              .querySelector('.new-user-form__wrapper');

            if (newUserForm) {
              newUserForm.classList.remove('visible');
            }
          })
          .catch((error) => ({
            Response: 'False',
            Error: error,
          }));
      });
  };

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEditableTitle('');
      setEditableId(0);
    }

    if (event.key === 'Enter') {
      const adminKeySidebar = document.querySelector('.adminKey');
      const adminPassInput = document
        .querySelector('.adminKey__input') as HTMLInputElement;

      if (adminKeySidebar && adminPassInput) { // TS
        if (adminKeySidebar.classList.contains('visible')) {
          if (adminPassInput.value.toLowerCase() === _0xf8fc[0]) {
            setAdminAccess(true);
            adminKeySidebar.classList.remove('visible');
            adminPassInput.value = '';
          } else if (adminPassInput.value.toLowerCase() !== _0xf8fc[0]
            && adminPassInput.value.length > 0) {
            setAdminKeyInvalid(true);
          }
        }
      }

      const newUserForm = document.querySelector('.new-user-form__wrapper');

      if (newUserForm) { // TS walkaround
        if (!newUserForm.classList.contains('visible')) {
          handleBlur();
        } else {
        // tryRegNewUser() call does not work from here;
        // should`ve dispatch the form if it`s visible
        // maybe I`ll fix it later if find out the issue
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleUserDelete = (userId: number | undefined) => {
    deleteUser(userId)
      .then(() => getUsersFromServer());
  };

  const switchUserHandle = (userEmail:string | undefined) => {
    if (userEmail) {
      setEmailIdInput(userEmail);

      const searchRes = loadedUsers
        .find((user:CloudUser) => user.email === userEmail);

      if (searchRes?.id) {
        setMainUserId(searchRes.id);
        setMainEmail(searchRes.email);
        sessionStorage.setItem('todosUserId', `${searchRes.id}`);
        sessionStorage.setItem('todosUserEmail', searchRes.email);

        setEmailIdInput('');
        const mainInput = document.querySelector('.new-todo') as HTMLElement;

        mainInput.blur();
        setUnknownUserError(false);
      } else {
        setUnknownUserError(true);
        sessionStorage.removeItem('todosUserId');
        sessionStorage.removeItem('todosUserEmail');
        setMainEmail('');
        setMainUserId(undefined);
        setLoadedTodos(([]));
      }

      window.scrollTo(0, 0);
    }
  };

  const toggleAdminKeyForm = () => {
    const adminKeySidebar = document.querySelector('.adminKey');
    const adminPassInput = document
      .querySelector('.adminKey__input') as HTMLElement;

    if (adminKeySidebar) { // TS validity check
      if (adminKeySidebar.classList.contains('visible')) {
        adminKeySidebar.classList.remove('visible');
      } else {
        adminKeySidebar.classList.add('visible');
        if (adminPassInput) {
          adminPassInput.focus();
        }
      }
    }
  };

  const NewTodoPlaceholder = () => {
    if (mainEmail) {
      return 'What needs to be done?';
    }

    return 'You need to log in first';
  };

  const emailIdPlaceholder = () => {
    if (mainEmail) {
      return `You are logged in as ${mainEmail}`;
    }

    return 'put your email here and press Enter';
  };

  return (
    <>
      <h1 className="title">These are your</h1>
      <div className="todoapp">
        <header className="header">
          <h1 id="cloudTodos-title">Cloud Todos</h1>

          <form
            onSubmit={handleNewTodo}
          >
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder={NewTodoPlaceholder()}
              value={newTodoInput}
              onChange={newTodoInputHandle}
            />
          </form>
        </header>

        {loadedTodos.length > 0 && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                checked={!loadedTodos.find(todo => !todo.completed)}
                onChange={ToggleAll}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <ul className="todo-list" data-cy="todoList">
                {visualTodos.map((todo:CloudTodo) => todoMarkup(todo))}
              </ul>
            </section>

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {
                  loadedTodos.filter((todo:CloudTodo) => !todo.completed).length
                }
                &#160;items left
              </span>

              <ul className="filters">
                <li>
                  <Link
                    to="/cloud"
                    className={classNames({
                      selected: location.pathname === '/cloud',
                    })}
                  >
                    All
                  </Link>
                </li>

                <li>
                  <Link
                    to="/cloud/active"
                    className={classNames({
                      selected: location.pathname === '/cloud/active',
                    })}
                  >
                    Active
                  </Link>
                </li>

                <li>
                  <Link
                    to="/cloud/completed"
                    className={classNames({
                      selected: location.pathname === '/cloud/completed',
                    })}
                  >
                    Completed
                  </Link>
                </li>
              </ul>

              {loadedTodos.find(todo => todo.completed) && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={clearCompleted}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      <div className="new-user-form__wrapper">
        <div className="new-user-form__main">
          <form
            className="new-user-form__shell"
            // onSubmit={tryRegNewUserForm}
          >
            <input
              name="name"
              type="text"
              className="new-user-form__input"
              placeholder="name"
              value={newUserObj.name}
              onChange={newUserInputHandle}
            />
            {regFormErrors.userName && (
              <div className="new-user-form__errorMsg">
                try valid name
              </div>
            )}
            <input
              name="email"
              type="text"
              className="new-user-form__input"
              placeholder="email"
              value={emailIdInput}
              onChange={emailIdInputHandle}
            />
            {regFormErrors.email && (
              <div className="new-user-form__errorMsg">
                try valid email
              </div>
            )}
            <input
              name="phone"
              type="text"
              className="new-user-form__input"
              placeholder="phone number (optional)"
              value={newUserObj.phone}
              onChange={newUserInputHandle}
            />
            <input
              name="nickname"
              type="text"
              className="new-user-form__input"
              placeholder="nickname (optional)"
              value={newUserObj.nickname}
              onChange={newUserInputHandle}
            />
            <button
              type="button"
              className="new-user-form__submit-button"
              onClick={tryRegNewUser}
            >
              Apply for registration
            </button>
          </form>
        </div>
      </div>

      <form
        onSubmit={submitNewEmailId}
      >
        <input
          type="text"
          className="new-todo"
          placeholder={emailIdPlaceholder()}
          value={emailIdInput}
          onChange={emailIdInputHandle}
        />
      </form>

      {UnknownUserError && (
        <div>
          <span className="error-tip">
            User with such email does not exist.
            You may correct your input or&#160;
          </span>
          <button
            type="button"
            onClick={openUserRegForm}
            className="new-user-button"
          >
            register a new User
          </button>
        </div>
      )}
      <br />
      {adminAccess && (
        <div className="adminPanel">
          <button
            type="button"
            onClick={getUsersFromServer}
            className="new-user-form__submit-button inline-btn"
          >
            Force Load Users From Server
          </button>
          <br />
          <button
            type="button"
            onClick={getTodosOfUser}
            className="new-user-form__submit-button inline-btn"
          >
            Force Load Todos of Selected User
          </button>
          <br />
          current main email &#34;
          <b>{mainEmail}</b>
          &#34;
          <br />
          current main User ID &#34;
          <b>{mainUserId}</b>
          &#34;
          <br />
          current loading flag &#34;
          <b>{`${loading}`}</b>
          &#34;
          <br />
          current loaded Todos of a selected user:
          <br />
          <ul>
            {loadedTodos.map(todo => (
              <li key={todo.id}>
                {todo.title}
              </li>
            ))}
          </ul>
          <br />
          current loaded Users:
          <br />
          <table className="adminPanel__usersTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>ID</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {loadedUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        switchUserHandle(user.email);
                      }}
                      className="new-user-button"
                    >
                      {user.email}
                    </button>
                  </td>
                  <td>
                    {user.id}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleUserDelete(user.id)}
                      className="new-user-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="adminKey">
        <div className="adminKey__label">
          Enter admin password
        </div>
        <input
          type="password"
          name="adminPasswordInput"
          className="adminKey__input"
          onChange={() => {
            setAdminKeyInvalid(false);
          }}
        />
        <button
          type="button"
          className="adminKey__legend"
          onClick={toggleAdminKeyForm}
        >
          admin panel
        </button>
        {adminKeyInvalid && (
          <div className="adminKey__errorMsg">
            admin password invalid
          </div>
        )}
      </div>
    </>
  );
};
