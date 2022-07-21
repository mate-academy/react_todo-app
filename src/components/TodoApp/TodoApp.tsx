import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { getUser } from '../api/user';
import {
  getMyTodos, postNewTodo, removeTodo, editTodo,
} from '../api/todos';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import './TodoApp.scss';

export const TodoApp: React.FC = () => {
  // #region loadUser, loadTodos
  const [userName, setUserName] = useState('');
  const [myTodos, setMyTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const loadUser = async () => {
    const userFromServer: User = await getUser();

    if (!userFromServer.error) {
      setUserName(userFromServer.name);
    } else {
      setErrorMessage('Failed to fecth User Info');
    }
  };

  const loadTodos = async () => {
    getMyTodos().then(setMyTodos);
  };
  // #endregion

  // #region addNewTodo, deleteTodo
  const [title, setTitle] = useState('');

  const addNewTodo = () => {
    postNewTodo(title);
    setTitle('');
    loadTodos();
  };

  const deleteTodo = (todoId: number) => {
    removeTodo(todoId);
    setMyTodos(myTodos.filter(
      (todo: Todo) => todo.id !== todoId,
    ));
  };
  // #endregion

  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // #region changeTodo
  const changeStatus = (todoId: number) => {
    setMyTodos(myTodos.map((todo: Todo) => {
      if (todo.id === todoId) {
        const data = { completed: !todo.completed };

        editTodo(`/todos/${todoId}`, data);

        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return {
        ...todo,
      };
    }));
  };

  const changeTitle = (todoId: number, newTitle: string) => {
    const data = { title: newTitle };

    if (!newTitle) {
      removeTodo(todoId);
    }

    editTodo(`/todos/${todoId}`, data);
    loadTodos();
  };
  // #endregion

  const [toggleAllActive, setToggleAllActive] = useState(false);

  const changeStatusAll = () => {
    const result = myTodos.map((todo: Todo) => {
      if (!toggleAllActive) {
        editTodo(`/todos/${todo.id}`, { completed: true });

        return {
          ...todo,
          completed: true,
        };
      }

      editTodo(`/todos/${todo.id}`, { completed: false });

      return {
        ...todo,
        completed: false,
      };
    });

    setMyTodos(result);
    setToggleAllActive(!toggleAllActive);
  };

  // #region visiableTodos
  const [visiableTodos, setVisiableTodos] = useState(myTodos);

  const showTodos = (param: string) => {
    switch (param) {
      case 'all':
        setVisiableTodos(myTodos);
        break;
      case 'active':
        setVisiableTodos(activeTodos);
        break;
      case 'completed':
        setVisiableTodos(completedTodos);
        break;
      default:
        break;
    }
  };
  // #endregion

  const clearCompleted = () => {
    myTodos.forEach((todo: Todo) => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });

    setMyTodos(myTodos.filter((todo: Todo) => !todo.completed));

    setToggleAllActive(false);
  };

  useEffect(() => {
    loadUser();
    loadTodos();
  }, []);

  useEffect(() => {
    const activeTodosFilter = myTodos.filter(
      (todo: Todo) => !todo.completed,
    );

    const completedTodosFilter = myTodos.filter(
      (todo: Todo) => todo.completed,
    );

    setActiveTodos(activeTodosFilter);
    setCompletedTodos(completedTodosFilter);
    setVisiableTodos(myTodos);
  }, [myTodos]);

  return (
    <section className="TodoApp">
      <header className="TodoApp__header">
        <h1 className="TodoApp__title">
          todos of
          {' '}
          {userName}
        </h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addNewTodo();
          }}
        >
          <input
            type="text"
            className="TodoApp__new-todo input"
            placeholder="What needs to be done?"
            data-cy="createTodo"
            value={title}
            onChange={
              (event) => setTitle(event.target.value)
            }
          />
        </form>
      </header>

      <section className="TodoApp__main">
        {errorMessage && (
          <p className="TodoApp__error">{errorMessage}</p>
        )}
        <input
          type="checkbox"
          id="toggle-all"
          className="TodoApp__toggle-all"
          data-cy="toggleAll"
          onChange={() => {
            changeStatusAll();
          }}
        />
        <label
          htmlFor="toggle-all"
          className={
            classNames(`TodoApp__toggleAll-label + ${toggleAllActive
              ? 'TodoApp__toggleAll-label--completed'
              : ''
            }`)
          }
        >
          Mark all as complete
        </label>

        <TodoList
          items={visiableTodos}
          deleteTodo={deleteTodo}
          changeStatus={changeStatus}
          changeTitle={changeTitle}
        />
      </section>

      {myTodos.length > 0 && (
        <footer className="TodoApp__footer">
          <span className="TodoApp__todo-count" data-cy="todosCounter">
            {activeTodos.length === 1
              ? '1 item left'
              : `${activeTodos.length} items left`}
          </span>

          <TodosFilter
            showTodos={showTodos}
          />

          {completedTodos.length > 0 && (
            <button
              type="button"
              className="TodoApp__clear-completed"
              onClick={() => clearCompleted()}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
};
