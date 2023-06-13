import React, { useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';
import { useLocalStorage } from './helpers/useLocaleStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todoStatus, setTodoStatus] = useState<Status>(Status.All);

  return (
    <div className="todoapp">

      <Header
        setTodos={setTodos}
      />

      {!!todos.length && (
        <>
          <TodoList
            todos={todos}
            todoStatus={todoStatus}
            setTodos={setTodos}
          />

          <Footer
            todos={todos}
            todoStatus={todoStatus}
            setTodoStatus={setTodoStatus}
            setTodos={setTodos}
          />
        </>
      )}

    </div>
  );
};
