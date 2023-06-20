import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  quarySearch: string,
  setQuarySearch: (value: string) => void;
  addTodo: () => void,
  handleUpdateAllTodoStatus: () => void,
};
export const TodoHeader: React.FC<Props> = ({
  todos,
  quarySearch,
  setQuarySearch,
  addTodo,
  handleUpdateAllTodoStatus,
}) => {
  const isActicve = todos.filter(todo => !todo.completed);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addTodo();
    setQuarySearch('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isActicve },
        )}
        onClick={handleUpdateAllTodoStatus}
        aria-label="delete tode"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={quarySearch}
          onChange={(e) => setQuarySearch(e.target.value)}
        />
      </form>
    </header>
  );
};
