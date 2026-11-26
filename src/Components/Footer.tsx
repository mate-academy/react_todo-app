import { useContext } from 'react';
import { TabsContext } from '../Context/TabsContext';

import cn from 'classnames';

export default function Footer() {
  const { todos, filter, setFilter, setTodos } = useContext(TabsContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === 'all',
          })}
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === 'active',
          })}
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === 'completed',
          })}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
        }}
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
}
