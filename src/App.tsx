import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoSection } from './components/TodoSection/TodoSection';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { Notification } from './components/Notification/Notification';
import { ErrorType } from './types/ErrorType';
import { useLocalStorage } from './utils/useLocalStorage';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

const getVisibleTodos = (path: string, allTodos: Todo[]) => {
  switch (path) {
    case FilterType.Active:
      return allTodos.filter(todo => todo.completed === false);

    case FilterType.Completed:
      return allTodos.filter(todo => todo.completed === true);

    default:
      return allTodos;
  }
};

export const App: React.FC = () => {
  const [hasError, setHasError] = useState(ErrorType.None);

  const { pathname } = useLocation();

  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={todos}
          setHasError={setHasError}
          setTodos={setTodos}
        />
        <Routes>
          <Route
            path="/"
            element={(
              <TodoSection
                todos={getVisibleTodos(pathname, todos)}
                setTodos={setTodos}
              />
            )}
          />

          <Route
            path="/active"
            element={(
              <TodoSection
                todos={getVisibleTodos(pathname, todos)}
                setTodos={setTodos}
              />
            )}
          />

          <Route
            path="/completed"
            element={(
              <TodoSection
                todos={getVisibleTodos(pathname, todos)}
                setTodos={setTodos}
              />
            )}
          />
        </Routes>

        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            setTodos={setTodos}
          />
        )}
      </div>

      <Notification
        hasError={hasError}
        setHasError={setHasError}
      />
    </div>
  );
};
