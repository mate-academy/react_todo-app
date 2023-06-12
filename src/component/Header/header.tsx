import React from 'react';
import classNames from 'classnames';

type Props = {
  querySearch: string,
  setQuerySearch: (query: string) => void,
  handleAddTodo: () => void,
  selectAllTodos: () => void,
  isAllTodosCompleted: boolean,
  hasSomeTodos: boolean
};

export const Header: React.FC<Props> = ({
  querySearch,
  setQuerySearch,
  handleAddTodo,
  selectAllTodos,
  isAllTodosCompleted,
  hasSomeTodos,
}) => {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleAddTodo();
    setQuerySearch('');
  };

  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line */}
      {hasSomeTodos && <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isAllTodosCompleted },
        )}
        onClick={selectAllTodos}
      />}

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
