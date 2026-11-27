import { useContext } from 'react';
import { TabsContext } from '../Context/TabsContext';
import { FILTERS } from '../Constants';
import cn from 'classnames';

type FooterProps = {
  onClearCompleted: () => void;
};

export default function Footer({ onClearCompleted }: FooterProps) {
  const { todos, filter, setFilter, setTodos } = useContext(TabsContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === FILTERS.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FILTERS.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === FILTERS.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FILTERS.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === FILTERS.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FILTERS.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={!todos.some(todo => todo.completed)}
          onClick={() => {
            setTodos(prevTodos =>
              prevTodos.filter(todo => !todo.completed)
            );

            onClearCompleted();
          }}
        >
          Clear completed
      </button>
    </footer>
  );
}
