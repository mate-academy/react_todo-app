/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// import { Loader } from './Loader';
// import { CloudTodo } from '../types/CloudTodo';
import {
  getAllUsers, LoadUserTodos, deleteTodo, createTodo, updateTodo,
} from '../api/users';
import { CloudTodo } from '../types/CloudTodo';
// import { getUserTodos } from '../api/users';
import { CloudUser } from '../types/CloudUser';

export const CloudTodos: React.FC = () => {
  const [loadedTodos, setLoadedTodos] = useState<CloudTodo[]>([]);
  const [emailIdInput, setEmailIdInput] = useState('');
  const [newTodoInput, setNewTodoInput] = useState('');
  const [editableId, setEditableId] = useState<number>();
  const [editableTitle, setEditableTitle] = useState('');
  const [mainUserId, setMainUserId] = useState<number>();
  const [mainEmail, setMainEmail] = useState('');
  const [stage, setStage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState<CloudUser[]>([]);
  const [UnknownUserError, setUnknownUserError] = useState(false);
  /* stage 0 - loginCheck - checking if valid login stored in session memory
     stage 1 - login valid - todos from server showed up
     stage 2 - valid login absent - enter your email screen show up
     stage 3 - User does not exist on the server - would U like to register screen
  */
  // const [todos, setTodos] = useState<CloudTodo[]>([]);

  function getTodosOfUser() {
    console.log('get Todos of User button pressed');
    if (mainUserId) {
      LoadUserTodos(mainUserId)
        .then(res => res.json())
        .then(userTodos => {
          console.log('loaded some user Todos');
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
    console.log('getusers button pressed');
    getAllUsers()
      .then(res => res.json())
      .then(users => {
        console.log(users);
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
          console.log('loaded some user Todos');
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

    if (savedEmail !== null) { // EMAIL IS VALID
      console.log('user is ', savedEmail);

      setLoading(true);
      setMainEmail(savedEmail);
      setMainUserId(Number(savedID));
      setStage('todos list');
      LoadUserTodos(Number(savedID))
        .then(res => res.json())
        .then(userTodos => {
          console.log('loaded some user Todos');
          setLoadedTodos(userTodos);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => ({
          Response: 'False',
          Error: error,
        }));
    } else {
      console.log('saved user is not found');
      /* enter your email section */
      setStage('enter email');
    }
  }, []);

  const emailIdInputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailIdInput(event.target.value);
    setUnknownUserError(false);
  };

  const submitNewEmailId = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      } else {
        setUnknownUserError(true);
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

    return 'put your email here';
  };

  const removeHandler = (todoId:number) => {
    deleteTodo(todoId)
      .then(() => {
        const savedID = sessionStorage.getItem('todosUserId');

        LoadUserTodos(Number(savedID))
          .then(res => res.json())
          .then(userTodos => {
            console.log('loaded some user Todos');
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
        removeHandler(editableTodo.id || 0); // 0 is a typegate for TS
      } else {
        updateTodo(editableTodo.id || 0, { title: editableTitle })
          .then(() => {
            setEditableTitle('');
            setEditableId(0);
            getTodosOfUser();
          });
        // update todo with new title and reset editableId
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

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditableTitle('');
        setEditableId(0);
      }

      if (event.key === 'Enter') {
        handleBlur();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

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

  const clearCompleted = () => {
    const completedTodos = loadedTodos.filter(todo => todo.completed)
      .map(todo => deleteTodo(todo.id || 0));

    Promise.all(completedTodos)
      .then(() => {
        const savedID = sessionStorage.getItem('todosUserId');

        LoadUserTodos(Number(savedID))
          .then(res => res.json())
          .then(userTodos => {
            console.log('loaded some user Todos');
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
              console.log('loaded some user Todos');
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
              console.log('loaded some user Todos');
              setLoadedTodos(userTodos);
            });
        })
        .catch((error) => ({
          throw: `some of the tasks completion statuses were not updated properly, code: + ${error}`,
        }));
    }
  };
  /*
    Needs to be done:
    - 211
    - 213
    - updating Todos list from server should be moved to separated function,
    as it will be called multiple times from different methods;
    - changing Todos state (completed or not via update API method);
    - whole logic and styling behind new Todo;
        ~~~ posting new todo from new todo string
    - whole logic and styling behind updating existing todos;
  */

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
                {loadedTodos.map((todo:CloudTodo) => todoMarkup(todo))}
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
                  <a href="#/" className="selected">All</a>
                </li>

                <li>
                  <a href="#/active">Active</a>
                </li>

                <li>
                  <a href="#/completed">Completed</a>
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
      <button
        type="button"
        onClick={getUsersFromServer}
        className="clear-completed"
      >
        Force Load Users From Server Button
      </button>
      <br />
      <button
        type="button"
        onClick={getTodosOfUser}
        className="clear-completed"
      >
        Force Load Todos of Selected User
      </button>

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
          User with such email does not exist.
          You may correct your input or register a new User
        </div>
      )}
      <br />
      current main email "
      <b>{mainEmail}</b>
      "
      <br />
      current main User ID "
      <b>{mainUserId}</b>
      "
      <br />
      current stage "
      <b>{stage}</b>
      "
      <br />
      current loading flag "
      <b>{`${loading}`}</b>
      "
      <br />
      current loaded Todos:
      <br />
      <ul>
        {loadedTodos.map(todo => (
          <li>
            {todo.title}
          </li>
        ))}
      </ul>
      <br />
      current loaded Users:
      <br />
      {loadedUsers.map(user => (
        <ul>
          <li key={user.id}>
            user name =
            {' '}
            {user.name}
            <br />
            user email =
            {' '}
            {user.email}
            <br />
            user ID =
            {' '}
            {user.id}
          </li>
        </ul>
      ))}
    </>
  );
};
