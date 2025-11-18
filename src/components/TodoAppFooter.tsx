import { useTodo } from '../hooks/useTodo';
import cn from 'classnames';
import { TypeLink } from '../types/Link';

export const TodoAppFooter: React.FC = () => {
  const { todos, clearSelectTodo, filter, changeFilter } = useTodo();

  const completeTodos = todos.filter(todo => todo.completed);
  const noCompleteTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${noCompleteTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(TypeLink).map(filterName => (
          <a
            key={filterName}
            href={`#/${filterName}`}
            className={cn('filter__link', { selected: filter === filterName })}
            data-cy={`FilterLink${filterName}`}
            onClick={() => changeFilter(filterName)}
          >
            {filterName}
          </a>
        ))}
      </nav>

      <button
        disabled={completeTodos.length === 0}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearSelectTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
