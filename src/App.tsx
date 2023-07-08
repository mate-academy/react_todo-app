/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useContext } from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { FilterStatus } from './types/FilterStatus';
import { Error } from './Error';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { Footer } from './Footer';
import { TodosContext } from './TodoContext';

const USER_ID = 9968;

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
    isDeleteError,
    isAddError,
    isUpdateError,
  } = useContext(TodosContext);
  const [setFilter] = useState(FilterStatus.all);
  const active = todos.filter(todo => todo.completed === false).length;
  const completed = todos.filter(todo => todo.completed).length;

  const toggleAll = todos.map(todo => (
    {
      ...todo,
      completed: true,
    }
  ));

  const untoggleAll = todos.map(todo => (
    {
      ...todo,
      completed: false,
    }
  ));

  useEffect(() => {
    getTodos(USER_ID)
      .then(value => {
        setTodos(value);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          setTodos={(todosArray) => setTodos(todosArray)}
        />

        {todos.length > 0 && (
          <Routes>
            <Route
              path="/"
              element={(
                <>
                  <TodoList
                    todos={todos}
                    visibleTodos={[...todos]}
                    toggleAll={toggleAll}
                    untoggleAll={untoggleAll}
                  />

                  <Footer
                    todos={todos}
                    active={active}
                    completed={completed}
                    filter={FilterStatus.all}
                    setFilter={() => setFilter}
                    setTodos={(todosArray) => setTodos(todosArray)}
                  />
                </>
              )}
            />

            <Route
              path={`/${FilterStatus.all}`}
              element={<Navigate to="/" replace />}
            />

            <Route
              path={`/${FilterStatus.completed}`}
              element={(
                <>
                  <TodoList
                    todos={todos}
                    visibleTodos={[...todos].filter(todo => todo.completed === true)}
                    toggleAll={toggleAll}
                    untoggleAll={untoggleAll}
                  />

                  <Footer
                    todos={todos}
                    active={active}
                    completed={completed}
                    filter={FilterStatus.completed}
                    setFilter={() => setFilter}
                    setTodos={(todosArray) => setTodos(todosArray)}
                  />
                </>
              )}
            />

            <Route
              path={`/${FilterStatus.active}`}
              element={(
                <>
                  <TodoList
                    todos={todos}
                    visibleTodos={[...todos].filter(todo => todo.completed === false)}
                    toggleAll={toggleAll}
                    untoggleAll={untoggleAll}
                  />

                  <Footer
                    todos={todos}
                    active={active}
                    completed={completed}
                    filter={FilterStatus.active}
                    setFilter={() => setFilter}
                    setTodos={(todosArray) => setTodos(todosArray)}
                  />
                </>
              )}
            />

            <Route
              path="/*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        )}
      </div>

      {isAddError && (
        <Error text="Unable to add a todo" />
      )}

      {isDeleteError && (
        <Error text="Unable to delete a todo" />
      )}

      {isUpdateError && (
        <Error text="Unable to update a todo" />
      )}
    </div>
  );
};
