/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  querySearch: string,
  setQuerySearch: (query: string) => void,
  handleAddTodo: () => void,
  selectAllTodos: () => void,
  isAllTodosCompleted: boolean,
};

export const Header: React.FC<Props> = ({
  querySearch,
  setQuerySearch,
  handleAddTodo,
  selectAllTodos,
  isAllTodosCompleted,
}) => {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleAddTodo();
    setQuerySearch('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isAllTodosCompleted },
        )}
        onClick={selectAllTodos}
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={querySearch}
          onChange={(event) => setQuerySearch(event.target.value)}
        />
      </form>
    </header>
  );
};
