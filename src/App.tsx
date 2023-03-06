import React, { useState } from 'react';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoApp } from './components/TodoApp';

import { Error } from './types/Error';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<Status>(Status.All);

  return (
    <>
      <div className="todoapp">
        <Header
          todos={todos}
          setTodos={setTodos}
          setIsError={setIsError}
        />
        {todos && (
          <TodoApp
            todos={todos}
            setTodos={setTodos}
            setIsError={setIsError}
            filter={filter}
            setFilter={setFilter}
          />
        )}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            setIsError={setIsError}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {isError && (
        <ErrorNotification
          isError={isError}
          setIsError={setIsError}
        />
      )}
    </>
  );
};
