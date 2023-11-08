/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import Todo from './types/Todo';
import { TodosFilter } from './types/TodosFilter';
import { TodoContent } from './components/TodoConent';
import { TodoFooter } from './components/TodoFooter';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodosContext } from './components/TodosContext';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todosFilter, setTodosFilter] = useState<TodosFilter>(TodosFilter.all);
  const [todoEditId, setTodoEditId] = useState(0);
  const [todoEdit, setTodoEdit] = useState('');

  const handleQuertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (query.trim()) {
      setTodos([...todos, { id: Date.now(), title: query, completed: false }]);
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
        {todos.length > 0
          && (
            <>
              <TodoContent />
              <TodoFooter />
            </>
          )}
      </TodosContext.Provider>
    </div>
  );
};
