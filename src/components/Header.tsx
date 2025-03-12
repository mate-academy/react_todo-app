import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from './SetTodosContext';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
}
export const Header: React.FC<Props> = ({ inputRef }) => {
  const [query, setQuery] = useState('');
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    return null;
  }

  const { filteredTodos, setTodos } = todoContext;
  const submitForm = () => {
    setTodos((prev: Todo[]) => [
      ...prev,
      {
        id: Date.now(),
        title: query,
        completed: false,
      },
    ]);

    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {filteredTodos.some(t => !t.completed) && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={submitForm}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          value={query}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
