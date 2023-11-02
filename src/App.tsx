/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';
import { FilterOptions } from './types/FilterOptions';
import { TodosContext } from './store/TodosContext';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState(FilterOptions.All);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTodo = () => {
    const newTodo = {
      id: +new Date(),
      title: newTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitle.trim()) {
      return;
    }

    addTodo();
    setNewTitle('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
            value={newTitle}
            onChange={handleTitleChange}
            ref={inputRef}
          />
        </form>
      </header>

      <TodosContext.Provider
        value={{
          todos,
          filter,
          setTodos,
          setFilter,
        }}
      >
        <TodoList />
        {todos.length > 0 && <TodoFilter />}
      </TodosContext.Provider>
    </div>
  );
};
