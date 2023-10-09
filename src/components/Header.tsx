import React, { useContext, useRef } from 'react';
import { Todo, TodosContext } from './TodosContext';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewTodoSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputRef.current) {
      const newTodoTitle = inputRef.current.value;

      if (!newTodoTitle) {
        return;
      }

      const newTodo: Todo = {
        id: new Date().getTime(),
        title: newTodoTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      inputRef.current.value = '';
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleNewTodoSubmit}>
        <input
          ref={inputRef}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
