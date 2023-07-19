/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  createTodos, deleteTodos, getTodos, getUser, updateTodos,
} from './api';
import { Todo } from './types/Todo';
import { TodosFilter } from './components/Footer';
import { Status } from './types/FilterTypes';
import { TodoList } from './components/TodoList';
import { Errors } from './types/ErrorMessages';
import { ErrorMessage } from './components/ErrorMessage';

const userId = 11065;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.NONE);
  const [query, setQuery] = useState('');
  const [userName, setUserName] = useState('');
  const [
    selectedFilter, setSelectedFilter,
  ] = useState<Status>(Status.ALL);

  const showAndDeleteError = (timer = 3000) => {
    return setTimeout(() => {
      setIsError(false);
      setErrorMessage(Errors.NONE);
    }, timer);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      createTodos({
        title: query,
        userId,
        completed: false,
      })
        .then((res) => {
          setTodos(prevTodos => [...prevTodos, res]);
        })
        .catch(() => {
          setIsError(true);
          setErrorMessage(Errors.ADD);
        })
        .finally(() => showAndDeleteError());

      setQuery('');
    }
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodos(todoId)
      .then(() => {
        setTodos(prevTodos => [...prevTodos
          .filter(todo => todo.id !== todoId)]);
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage(Errors.DELETE);
      })
      .finally(() => showAndDeleteError());
  };

  const handleUpdateTodo = (
    todoId: number,
    data: { [key: string]: string | boolean },
  ) => {
    updateTodos(todoId, data)
      .then((res) => {
        setTodos(prevTodos => [
          ...prevTodos.map(todo => {
            return todo.id === todoId ? res : todo;
          }),
        ]);
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage(Errors.UPDATE);
      })
      .finally(() => showAndDeleteError());
  };

  const filterTodos = (filterBy: Status) => {
    if (todos.length > 0) {
      switch (filterBy) {
        case Status.ACTIVE:
          return todos.filter(todo => !todo.completed);

        case Status.COMPLETED:
          return todos.filter(todo => todo.completed);

        default:
          return todos;
      }
    }

    return todos;
  };

  const completedTodos = filterTodos(Status.COMPLETED);
  const activeTodos = filterTodos(Status.ACTIVE);

  useEffect(() => {
    getUser().then(res => setUserName(res.name));

    getTodos()
      .then(setTodos)
      .catch(() => {
        setIsError(true);
        setErrorMessage(Errors.GET);
      })
      .finally(() => {
        showAndDeleteError();
      });
  }, []);

  const handleDeleteAllCompletedTodos = () => {
    completedTodos.map(todo => handleDeleteTodo(todo.id));
  };

  const toggleAll = () => {
    return activeTodos.length > 0
      ? activeTodos
        .map(todo => handleUpdateTodo(todo.id, { completed: !todo.completed }))
      : todos
        .map(todo => handleUpdateTodo(todo.id, { completed: !todo.completed }));
  };

  return (
    <>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <p className="todoapp-username">{userName}</p>

          <form
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              data-cy="createTodo"
              value={query}
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={handleQueryChange}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={() => toggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          {todos.length > 0 && (
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={(
                    <TodoList
                      items={todos}
                      handleDeleteTodo={handleDeleteTodo}
                      handleUpdateTodo={handleUpdateTodo}
                    />
                  )}
                />
                <Route
                  path="active"
                  element={(
                    <TodoList
                      items={activeTodos}
                      handleDeleteTodo={handleDeleteTodo}
                      handleUpdateTodo={handleUpdateTodo}
                    />
                  )}
                />
                <Route
                  path="completed"
                  element={(
                    <TodoList
                      items={completedTodos}
                      handleDeleteTodo={handleDeleteTodo}
                      handleUpdateTodo={handleUpdateTodo}
                    />
                  )}
                />
              </Route>
            </Routes>
          )}
        </section>

        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTodos.length} items left`}
            </span>

            <TodosFilter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            <button
              type="button"
              className="clear-completed"
              hidden={completedTodos.length === 0}
              onClick={() => handleDeleteAllCompletedTodos()}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        isError={isError}
      />
    </>
  );
};
