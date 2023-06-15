import React from 'react';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoSection } from './components/TodoSection/TodoSection';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { useLocalStorage } from './utils/useLocalStorage';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  return (
    <div className="todoapp">
      <TodoHeader
        todos={todos}
        setTodos={setTodos}
      />

      <TodoSection
        todos={todos}
        setTodos={setTodos}
      />

      {!!todos.length && (
        <TodoFooter
          todos={todos}
          setTodos={setTodos}
        />
      )}
    </div>
  );
};
