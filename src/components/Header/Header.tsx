import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  activeTodos: Todo[],
  toggleTodos: () => void,
  addTodo: (title: string) => void,
};

export const Header: React.FC<Props> = ({
  activeTodos, toggleTodos, addTodo,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(query);
    setQuery('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        data-cy="toggleAll"
        className={classNames(
          'todoapp__toggle-all',
          { active: !!activeTodos.length },
        )}
        onClick={toggleTodos}
      />
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleInputChange}
          value={query}
        />
      </form>
    </header>
  );
};
