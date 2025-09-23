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

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedFilter(Filter.Completed)}
        >
          Completed
        </a>
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
