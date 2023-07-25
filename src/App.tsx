/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  deleteTodos,
  getTodos,
  getUser,
  updateTodos,
} from './api';
import { Todo } from './types/Todo';
import { TodosFilter } from './components/Footer';
import { Status } from './types/FilterTypes';
import { TodoList } from './components/TodoList';
import { Errors } from './types/ErrorMessages';
import { ErrorMessage } from './components/ErrorMessage';
import { NewTodoForm } from './components/NewTodoForm';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.None);
  const [userName, setUserName] = useState('');

  const showAndDeleteError = (timer = 3000) => {
    return setTimeout(() => {
      setIsError(false);
      setErrorMessage(Errors.None);
    }, timer);
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodos(todoId)
      .then(() => {
        setTodos(prevTodos => [...prevTodos
          .filter(todo => todo.id !== todoId)]);
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage(Errors.Delete);
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
        setErrorMessage(Errors.Update);
      })
      .finally(() => showAndDeleteError());
  };

  const filterTodos = (filterBy: Status) => {
    if (todos.length > 0) {
      switch (filterBy) {
        case Status.Active:
          return todos.filter(todo => !todo.completed);

        case Status.Completed:
          return todos.filter(todo => todo.completed);

        default:
          return todos;
      }
    }

    return todos;
  };

  const completedTodos = useMemo(() => filterTodos(Status.Completed), [todos]);

  const activeTodos = useMemo(() => filterTodos(Status.Active), [todos]);

  useEffect(() => {
    getUser().then(res => setUserName(res.name));

    getTodos()
      .then(setTodos)
      .catch(() => {
        setIsError(true);
        setErrorMessage(Errors.Get);
      })
      .finally(() => {
        showAndDeleteError();
      });

    return clearTimeout(showAndDeleteError());
  }, []);

  const handleDeleteAllCompletedTodos = () => {
    completedTodos.map(todo => handleDeleteTodo(todo.id));
  };

  const toggleAll = () => {
    const list = activeTodos.length ? activeTodos : todos;

    return list
      .map(todo => handleUpdateTodo(todo.id, { completed: !todo.completed }));
  };

  return (
    <>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <p className="todoapp-username">{userName}</p>

          <NewTodoForm
            setTodos={setTodos}
            setIsError={setIsError}
            setErrorMessage={setErrorMessage}
            showAndDeleteError={showAndDeleteError}
          />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todos.length > 0 && completedTodos.length === todos.length}
            data-cy="toggleAll"
            onClick={toggleAll}
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

              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          )}
        </section>

        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {activeTodos.length === 1 ? '1 item left' : `${activeTodos.length} items left`}
            </span>

            <TodosFilter />

            <button
              type="button"
              className="clear-completed"
              hidden={completedTodos.length === 0}
              onClick={handleDeleteAllCompletedTodos}
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
