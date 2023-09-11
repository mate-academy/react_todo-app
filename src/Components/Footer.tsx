import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

type Props = {
  filterBy: FilterType,
  setFilterBy: (value: FilterType) => void,
  todos: Todo[],
  onDelete: (id: number) => void,
};

const filterOptions = Object.values(FilterType);

export const Footer: React.FC<Props> = React.memo(({
  filterBy,
  setFilterBy,
  todos,
  onDelete,
}) => {
  const itemsLeftLength = todos.filter((todo) => !todo.completed).length;

  const deleteAllCompletedTodos = async () => {
    const completedTodoIds = todos.filter(todo => todo.completed);
    const idCompletesTodoId = completedTodoIds.map(todo => todo.id);

    await Promise.all(idCompletesTodoId.map(id => onDelete(id)));
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {itemsLeftLength <= 1
          ? '1 item left'
          : `${itemsLeftLength} items left`}
      </span>

      <nav className="filter">
        {filterOptions.map((option) => {
          return (
            <a
              key={option}
              href={`#/${option}`}
              className={classNames(
                'filter__link',
                { selected: filterBy === option },
              )}
              onClick={() => setFilterBy(option)}
            >
              {option}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={deleteAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
});
