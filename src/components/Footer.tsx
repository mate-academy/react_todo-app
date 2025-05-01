import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../context/TodosContext';
import classNames from 'classnames';
import { FilterValue } from '../types/FilterValue';

type FooterProps = {};

export const Footer: React.FC<FooterProps> = () => {
  const { todos, filterValue, setFilterValue, changeTodos } =
    useContext(TodosContext);

  const unCompletedTodos = useMemo(() => {
    return todos.filter(td => !td.completed);
  }, [todos]);

  const deletedCompleted = async () => {
    const completedTodos = todos.filter(td => td.completed);

    await Promise.all(completedTodos.map(todo => changeTodos(todo, 'delete')));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {unCompletedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {['All', 'Active', 'Completed'].map(value => (
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filterValue === value,
            })}
            data-cy={`FilterLink${value}`}
            key={value}
            onClick={() => setFilterValue(value as FilterValue)}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={unCompletedTodos.length === todos.length}
        onClick={deletedCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
