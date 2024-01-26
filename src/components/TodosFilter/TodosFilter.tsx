import { useContext } from 'react';
import classNames from 'classnames';

import { TodosContext } from '../../context/TodosContext';

export const TodosFilter = () => {
  const {
    todos, setTodo, filter, setFilter,
  } = useContext(TodosContext);

  const activeTodos = todos.filter(todo => todo.completed === false);
  const todosCounter = activeTodos.length;
  const completedTodos = todos.filter(todo => todo.completed);

  const clearCompleted = () => {
    setTodo([...activeTodos]);
  };

  return (
    <footer className="footer">
      {todos.length > 0 && (
        <>
          <span className="todo-count" data-cy="todosCounter">
            {`${todosCounter} items left`}
          </span>

          <ul className="filters" data-cy="todosFilter">
            <li>
              <a
                href="#/"
                className={classNames({
                  selected: filter === 'all',
                })}
                onClick={() => setFilter('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={() => setFilter('active')}
                className={classNames({
                  selected: filter === 'active',
                })}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                onClick={() => setFilter('completed')}
                className={classNames({
                  selected: filter === 'completed',
                })}
              >
                Completed
              </a>
            </li>
          </ul>

          {
            completedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            )
          }
        </>
      )}
    </footer>
  );
};
