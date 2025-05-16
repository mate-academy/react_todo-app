import classNames from 'classnames';
import { Filter } from '../hooks/Reducer';
import { useTodoState } from '../context/TodoContext';
import { useFooter } from '../hooks/FooterHooks';

export const Footer: React.FC = () => {
  const { todos, filter, activeCount } = useTodoState();
  const { applyFilter, clearAll } = useFooter();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount + ' items left'}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(en => (
          <a
            key={en}
            href={`#/${en.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: en === filter,
            })}
            data-cy={`FilterLink${en}`}
            onClick={event => applyFilter(event, en)}
          >
            {en}
          </a>
        ))}
      </nav>

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={event => clearAll(event)}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
