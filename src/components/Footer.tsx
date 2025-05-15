import classNames from 'classnames';
import { Filter } from '../hooks/Reducer';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filter: Filter;
  setFilter: (
    event: React.MouseEvent<HTMLAnchorElement>,
    value: Filter,
  ) => void;
  clear: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  setFilter,
  clear,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length + ' items left'}
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
            onClick={event => setFilter(event, en)}
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
          onClick={clear}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
