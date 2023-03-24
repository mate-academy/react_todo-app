/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { TypeError } from '../types/TypeError';
import { TodoItem } from './TodoItem';
import { TodosFilter } from './TodosFilter';
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from '../api/todos';
import { getUser } from '../api/users';
import { User } from '../types/User';

const USER_ID = 6707;

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || 'null') || [],
  );
  const saveTodos = (currentTodos: Todo[]) => {
    setTodos(currentTodos);
    localStorage.setItem('todos', JSON.stringify(currentTodos));
  };

  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [typeError, setTypeError] = useState('');
  const [textError, setTextError] = useState('');
  const [disableInput, setDisableInput] = useState(false);
  const [idTodosLoading, setIdTodosLoading] = useState<number[]>([]);
  const [titleTodo, setTitleTodo] = useState('');
  const filterByStatus = useLocation().pathname;

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const areAllTodosCompleted = todos.every(todo => todo.completed);

  const deleteHandler = (todoId?: number) => {
    setTypeError('');
    const todoIdsForDeleting = todoId
      ? [todoId]
      : completedTodos.map(todo => todo.id);

    setIdTodosLoading(todoIdsForDeleting);
    const clearingTodos = todoIdsForDeleting.map(id => deleteTodo(id));

    Promise.all(clearingTodos)
      .then(() => {
        saveTodos(todoId
          ? todos.filter(todo => todo.id !== todoId)
          : [...activeTodos]);
      })
      .catch(() => {
        setTypeError(TypeError.Delete);
        setTextError(TypeError.Delete);
      })
      .finally(() => {
        setIdTodosLoading([]);
      });
  };

  const updateHandler = (todoId: number, title?: string) => {
    const indexCurrentTodo = todos.findIndex(todo => todo.id === todoId);
    const data = title
      ? { title }
      : { completed: !todos[indexCurrentTodo].completed };

    setTypeError('');
    setIdTodosLoading([todoId]);

    updateTodo(todoId, data)
      .then((updatedTodo) => {
        todos.splice(indexCurrentTodo, 1, updatedTodo);
        saveTodos([...todos]);
      })
      .catch(() => {
        setTypeError(TypeError.Update);
        setTextError(TypeError.Update);
      })
      .finally(() => setIdTodosLoading([]));
  };

  const toggleAllHandler = () => {
    const todoIdsForToggle = areAllTodosCompleted
      ? completedTodos.map(todo => todo.id)
      : activeTodos.map(todo => todo.id);
    const data = { completed: !areAllTodosCompleted };

    setTypeError('');
    setIdTodosLoading(todoIdsForToggle);
    const togglingTodos = todoIdsForToggle.map(id => updateTodo(id, data));

    Promise.all(togglingTodos)
      .then((results) => {
        saveTodos(areAllTodosCompleted
          ? results
          : todos.map(todo => ({ ...todo, completed: true })));
      })
      .catch(() => {
        setTypeError(TypeError.Update);
        setTextError(TypeError.Update);
      })
      .finally(() => setIdTodosLoading([]));
  };

  const addHandler = () => {
    if (!titleTodo) {
      setTypeError(TypeError.TitleIsEmpty);
      setTextError(TypeError.TitleIsEmpty);

      return;
    }

    const data = {
      userId: USER_ID,
      title: titleTodo,
      completed: false,
    };

    setTypeError('');
    setDisableInput(true);
    setTempTodo({ ...data, id: 0 });

    createTodo(data)
      .then((addedTodo) => {
        saveTodos([...todos, addedTodo]);
        setTitleTodo('');
      })
      .catch(() => {
        setTypeError(TypeError.Add);
        setTextError(TypeError.Add);
      })
      .finally(() => {
        setTempTodo(null);
        setDisableInput(false);
      });
  };

  const closeErrorMessage = () => setTypeError('');

  useEffect(() => {
    getUser(USER_ID)
      .then(loadedUser => setUser(loadedUser))
      .catch(() => {
        setTypeError(TypeError.LoadUser);
        setTextError(TypeError.LoadUser);
      });
  }, []);

  useEffect(() => {
    getTodos(USER_ID)
      .then(loadedTodos => saveTodos(loadedTodos))
      .catch(() => {
        setTypeError(TypeError.LoadTodos);
        setTextError(TypeError.LoadTodos);
      });
  }, []);

  useEffect(() => {
    const timerId = setTimeout(setTypeError, 3000, '');

    return () => clearTimeout(timerId);
  }, [typeError]);

  const visibleTodos = useMemo(() => {
    switch (filterByStatus) {
      case Status.Active:
        return activeTodos;

      case Status.Completed:
        return completedTodos;

      default:
        return todos;
    }
  }, [filterByStatus, todos]);

  const submitNewTitle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addHandler();
  };

  const titleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disableInput) {
      setTitleTodo(event.target.value);
    }
  };

  const clearCompletedTodos = () => deleteHandler();
  const getUserName = () => (user ? user.name : '');

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <h5 className="todoapp__subtitle">{getUserName()}</h5>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                { active: areAllTodosCompleted },
              )}
              onClick={toggleAllHandler}
            />
          )}

          <form
            onSubmit={submitNewTitle}
          >
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={titleTodo}
              onChange={titleInput}
              data-cy="createTodo"
            />
          </form>
        </header>

        {(!!todos.length || tempTodo) && (
          <>
            <section className="todoapp__main">
              <TransitionGroup>
                {visibleTodos.map(todo => (
                  <CSSTransition
                    key={todo.id}
                    timeout={500}
                    classNames="item"
                  >
                    <TodoItem
                      todo={todo}
                      deleteHandler={deleteHandler}
                      isProcessed={idTodosLoading.includes(todo.id)}
                      onUpdate={updateHandler}
                    />
                  </CSSTransition>
                ))}
                {tempTodo && (
                  <CSSTransition
                    key={0}
                    timeout={500}
                    classNames="temp-item"
                  >
                    <TodoItem
                      todo={tempTodo}
                      isProcessed
                    />
                  </CSSTransition>
                )}
              </TransitionGroup>
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${activeTodos.length} items left`}
              </span>

              <TodosFilter />

              <button
                type="button"
                className="todoapp__clear-completed"
                style={{
                  visibility: completedTodos.length
                    ? 'visible'
                    : 'hidden',
                }}
                onClick={clearCompletedTodos}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !typeError },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={closeErrorMessage}
        />
        {textError}
      </div>
    </div>
  );
};
