import React, { useState } from 'react';
import { TodosContext } from './components/TodosContext';
import { Todo } from './types/Todo';
import { TodoContent } from './components/TodoContent';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoFooter } from './components/TodoFooter';
import { TodosFilter } from './types/TodosFilter';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todosFilter, setTodosFilter] = useState<TodosFilter>(TodosFilter.all);
  const [todoEditId, setTodoEditId] = useState<number>(0);
  const [todoEdit, setTodoEdit] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      const todo = {
        id: Date.now(),
        title: query,
        completed: false,
      };

      setTodos([...todos, todo]);
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
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </header>

      <TodosContext.Provider
        value={{
          todos,
          todosFilter,
          todoEditId,
          todoEdit,
          setTodos,
          setTodosFilter,
          setTodoEditId,
          setTodoEdit,
        }}
      >
        {todos.length > 0 && (
          <>
            <TodoContent />
            <TodoFooter />
          </>
        )}
      </TodosContext.Provider>
    </div>
  );
};
