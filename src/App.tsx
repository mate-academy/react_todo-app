/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import Todo from './types/Todo';
import { TodoContent } from './components/TodoConent';
import { TodoFooter } from './components/TodoFooter';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoProvider } from './components/TodosContext';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  console.log('Todos from useLocalStorage:', todos);

  const handleQuertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (query.trim()) {
      const newTodos
      = [...todos, { id: Date.now(), title: query, completed: false }];
      console.log('New Todos:', newTodos);

      setTodos(newTodos);
      setQuery('');
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={handleQuertChange}
          />
        </form>
      </header>

      <TodoProvider>
        <TodoContent />
        <TodoFooter />
      </TodoProvider>
    </div>
  );
};
