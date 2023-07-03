import React, { useState } from 'react';

import { Header } from './componets/Header';

import { TodoList } from './componets/TodoList';

import { Footer } from './componets/Footer';

import { useLocalStorage } from './tools/useLocalStorage';

import { FilterById } from './type/FilterById';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filterId, setFilterId] = useState(FilterById.ALL);

  return (
    <div className="todoapp">

      <Header
        setTodos={setTodos}
      />

      {
        todos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              setTodos={setTodos}
              filterId={filterId}
            />

            <Footer
              todos={todos}
              setTodos={setTodos}
              filterId={filterId}
              setFilterId={setFilterId}
            />
          </>
        )
      }
    </div>
  );
};
