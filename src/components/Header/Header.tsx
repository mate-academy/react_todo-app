import { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoContextType } from '../../types/types';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const { addTodo, todos, counterCompletedTodos, toggleAllTodo, inputRef } =
    useContext(TodoContext) as TodoContextType;

  const reset = () => {
    setQuery('');
  };

  const handleQueryChange = (newValue: string) => {
    setQuery(newValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    addTodo({
      id: 0,
      title: query.trim(),
      completed: false,
    });

    reset();
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: counterCompletedTodos === todos.length,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodo}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => {
            handleQueryChange(event.target.value);
          }}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
