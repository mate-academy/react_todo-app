import { useContext } from 'react';
import { FilterContext, TodosContext } from '../../types/todoContext';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';

type Props = {
  onAction: () => void;
};

export const Footer: React.FC<Props> = ({ onAction }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { filter, setFilter } = useContext(FilterContext);

  const hasCompleted = todos.some(todo => todo.completed);

  const clearCompleted = () => {
    setTodos(prev =>
      prev.filter(todo => {
        return todo.completed === false;
      }),
    );
    onAction();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {
          todos.filter(todo => {
            return todo.completed === false;
          }).length
        }{' '}
        items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            setFilter(Filter.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setFilter(Filter.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setFilter(Filter.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
