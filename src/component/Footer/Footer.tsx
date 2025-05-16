import { useDeleteTodos, useTodos } from '../../context/TodosContext';

export const Footer: React.FC = () => {
  const { todos, status, setStatus } = useTodos();

  const deletTodos = useDeleteTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos?.filter(td => td.completed !== true).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${status === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={e => {
            setStatus(e.currentTarget.innerHTML.toLowerCase());
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${status === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={e => {
            setStatus(e.currentTarget.innerHTML.toLowerCase());
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${status === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={e => {
            setStatus(e.currentTarget.innerHTML.toLowerCase());
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
        onClick={() =>
          deletTodos(
            todos.filter(todo => todo.completed === true).map(td => td.id),
          )
        }
        disabled={
          todos.filter(todo => todo.completed === true).length === 0
            ? true
            : false
        }
      >
        Clear completed
      </button>
    </footer>
  );
};
