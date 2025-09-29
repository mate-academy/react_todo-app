import { useTodos } from '../TodosContext';
import { Filter } from '../types/Filter';
import classNames from 'classnames';

export const TodoFooter: React.FC = () => {
  const { todos, removeTodo, selectedFilter, setSelectedFilter } = useTodos();

  const hasNoCompletedTodos = !todos.some(todo => todo.completed);

  function deleteCompleted() {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.map(todo => removeTodo(todo.id));
  }

  const noCompletedTodos = todos.filter(todo => !todo.completed).length;

  const filtersValue = Object.values(Filter);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${noCompletedTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filtersValue.map(filter => (
          <a
            key={filter}
            href={filter === 'All' ? '#/' : `#/${filter}`}
            className={classNames('filter__link', {
              selected: selectedFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={hasNoCompletedTodos}
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
