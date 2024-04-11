import classNames from 'classnames';
import { Filter, Todo } from '../types/types';

type Props = {
  todos: Todo[];
  setTodos: (prop: Todo[]) => void;
  completedTodos: Todo[];
  filter: Filter;
  setFilter: (prop: Filter) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  filter,
  setFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length - completedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          hidden: completedTodos.length <= 0,
        })}
        data-cy="ClearCompletedButton"
        onClick={() => {
          setTodos(todos.filter(todo => !completedTodos.includes(todo)));
          completedTodos.filter(() => false);
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
