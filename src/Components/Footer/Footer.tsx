import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import {
  DispatchContext,
  StateContext,
} from '../../GlobalProvider/GlobalProvider';
import { useContext } from 'react';

type Props = {
  filter: string;
  setFilter: (value: Filter) => void;
};

export const Footer: React.FC<Props> = ({ filter, setFilter }) => {
  const todos = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodos = todos.filter(todo => !todo.completed);
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const handleClearCompleted = () => {
    dispatch({ type: 'clearCompleted' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(f => (
          <a
            key={f}
            href={`#/${f.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filter === f,
            })}
            data-cy={`FilterLink${f.charAt(0).toUpperCase() + f.slice(1)}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1).toLowerCase()}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
