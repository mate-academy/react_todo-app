import { useTodos } from '../TodosContext';

export const Footer = () => {
  const {
    todos, setTodos, setFilter, filter,
  } = useTodos();

  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const countActiveTodos = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  const handleFilterClick = (type: string) => {
    setFilter(type);
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${countActiveTodos()} ${countActiveTodos() === 1 ? 'item' : 'items'} left`}
          </span>

          <ul className="filters" data-cy="todosFilter">
            <li>
              <a
                href="#/"
                className={filter === 'all' ? 'selected' : ''}
                onClick={() => handleFilterClick('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={filter === 'active' ? 'selected' : ''}
                onClick={() => handleFilterClick('active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={filter === 'completed' ? 'selected' : ''}
                onClick={() => handleFilterClick('completed')}
              >
                Completed
              </a>
            </li>
          </ul>

          {todos.some(todo => todo.completed) ? (
            <button
              type="button"
              className="clear-completed"
              data-cy="deleteTodo"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          ) : null}
        </footer>
      )}
    </>
  );
};
