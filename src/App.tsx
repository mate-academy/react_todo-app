/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { debounce } from 'lodash';

import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { DefaultContext } from './components/DefaultContext';
import { ErrorContext }
  from './components/ErrorNotification/ErrorContext';

import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { ErrorNotification } from './components/ErrorNotification';

import {
  getTodos, postTodo, deleteTodo, patchTodo,
} from './api/todos';

import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { Errors } from './types/Errors';

export const App: React.FC = React.memo(
  () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = useContext(AuthContext);
    const newTodoField = useRef<HTMLInputElement>(null);

    const {
      todosFromServer,
      setTodosFromServer,
      setTodoIdsForLoader,
    } = useContext(DefaultContext);

    const { setError } = useContext(ErrorContext);

    const [status, setStatus] = useState(Status.ALL);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [appliedNewTodoTitle, setAppliedNewTodoTitle] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const loadTodos = async () => {
      if (user) {
        try {
          setError(Errors.NONE);
          const todos = await getTodos(user.id);

          setTodosFromServer(todos);
        } catch {
          setError(Errors.LOAD);
        }
      }
    };

    const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (user && newTodoTitle.trim().length) {
        try {
          setIsAdding(true);
          const todo = await postTodo(user.id, newTodoTitle) as Todo;

          setTodosFromServer([...todosFromServer, todo]);
        } catch {
          setError(Errors.ADD);
        } finally {
          setIsAdding(false);
          setNewTodoTitle('');
        }
      } else {
        setError(Errors.ADD);
      }
    };

    const toggleAllTodos = async () => {
      try {
        const activeTodosIds = todosFromServer
          .filter(todo => !todo.completed)
          .map(todo => todo.id);

        if (activeTodosIds.length) {
          setTodoIdsForLoader(activeTodosIds);

          await Promise.all(activeTodosIds
            .map(id => patchTodo(id, { completed: true })));

          setTodosFromServer(todosFromServer
            .map(todo => ({ ...todo, completed: true })));
        } else {
          const todosIds = todosFromServer.map(todo => todo.id);

          setTodoIdsForLoader(todosIds);

          await Promise.all(todosFromServer
            .map(todo => patchTodo(todo.id, { completed: false })));

          setTodosFromServer(todosFromServer
            .map(todo => ({ ...todo, completed: false })));
        }
      } catch {
        setError(Errors.UPDATE);
      } finally {
        setTodoIdsForLoader([]);
      }
    };

    const clearCompletedTodos = async () => {
      try {
        const completedTodosIds = todosFromServer
          .filter(todo => todo.completed)
          .map(todo => todo.id);

        setTodoIdsForLoader(completedTodosIds);

        await Promise.all(completedTodosIds.map(id => deleteTodo(id)));

        setTodosFromServer(todosFromServer.filter(todo => !todo.completed));
      } catch {
        setError(Errors.DELETE_COMPLETED);
      } finally {
        setTodoIdsForLoader([]);
      }
    };

    useEffect(() => {
      loadTodos();
    }, [user]);

    useEffect(() => {
      if (newTodoField.current) {
        newTodoField.current.focus();
      }
    }, [todosFromServer]);

    const todos = useMemo(() => (
      todosFromServer.filter(todo => {
        switch (status) {
          case Status.COMPLETED:
            return todo.completed;

          case Status.ACTIVE:
            return !todo.completed;
          default:
            return todo;
        }
      })
    ), [todosFromServer, status]);

    const activeTodosCount = todosFromServer.reduce(
      (acc, todo) => (!todo.completed ? 1 : 0) + acc, 0,
    );

    const completedTodosCount = todosFromServer.reduce(
      (acc, todo) => (todo.completed ? 1 : 0) + acc, 0,
    );

    const applyNewTodoTitle = useCallback(
      debounce(setAppliedNewTodoTitle, 1000),
      [],
    );

    return (
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header">
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                { active: activeTodosCount === 0 },
                { hidden: todosFromServer.length === 0 },
              )}
              onClick={() => toggleAllTodos()}
            />

            <form onSubmit={createTodo}>
              <input
                data-cy="NewTodoField"
                type="text"
                ref={newTodoField}
                className="todoapp__new-todo"
                placeholder="What needs to be done?"
                value={newTodoTitle}
                disabled={isAdding}
                onChange={e => {
                  setNewTodoTitle(e.target.value);
                  applyNewTodoTitle(e.target.value);
                }}
              />
            </form>
          </header>

          <TodoList
            todos={todos}
            isAdding={isAdding}
            newTodoTitle={appliedNewTodoTitle}
          />

          <footer
            className={classNames(
              'todoapp__footer',
              { hidden: todosFromServer.length === 0 },
            )}
            data-cy="Footer"
          >
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTodosCount} items left`}
            </span>

            <Filter
              status={status}
              setStatus={setStatus}
            />

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className={classNames(
                'todoapp__clear-completed',
                { hidden: completedTodosCount === 0 },
              )}
              onClick={clearCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        </div>

        <ErrorNotification />
      </div>
    );
  },
);
