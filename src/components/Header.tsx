import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  userId: number,
  createdTodo: (newTitle: string) => void,
  isLoading: boolean,
  todos: Todo[],
  isCheckedToggleAll: boolean,
  toggleAllTodos: () => void,
};

export const Header: React.FC<Props> = ({
  createdTodo,
  isLoading,
  todos,
  isCheckedToggleAll,
  toggleAllTodos,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    createdTodo(query);
    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          id="toggle-all"
          data-cy="toggleAll"
          className={classNames(
            'todoapp__toggle-all',
            { active: isCheckedToggleAll },
          )}
          aria-label="ToggleAll"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          data-cy="createTodo"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          disabled={isLoading}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
