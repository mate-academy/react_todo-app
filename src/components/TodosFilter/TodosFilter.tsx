import { useContext, useState } from 'react';
import classNames from 'classnames';

import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';

export const TodosFilter = () => {
  const { todos, setTodo, setRenderTodo } = useContext(TodosContext);
  const [filterType, setFilterType] = useState('all');

  const activeTodos = todos.filter(todo => todo.completed === false);
  const todosCounter = activeTodos.length;
  const completedTodos = todos.filter(todo => todo.completed);

  const clearCompleted = () => {
    setTodo([...activeTodos]);
    setRenderTodo([...activeTodos]);
  };

  const handleFilterTodo = (select: string) => {
    setFilterType(select);

    const newTodo: Todo[] = todos.filter(todo => {
      switch (select) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default: return true;
      }
    });

    setRenderTodo(newTodo);
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
                  selected: filterType === 'all',
                })}
                onClick={() => handleFilterTodo('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={() => handleFilterTodo('active')}
                className={classNames({
                  selected: filterType === 'active',
                })}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                onClick={() => handleFilterTodo('completed')}
                className={classNames({
                  selected: filterType === 'completed',
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
