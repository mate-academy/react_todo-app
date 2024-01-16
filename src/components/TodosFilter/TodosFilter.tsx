import { useContext, useState } from 'react';
import classNames from 'classnames';

import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';

export const TodosFilter = () => {
  const { todos, setTodo, setRenderTodo } = useContext(TodosContext);
  const [filterType, setFilterType] = useState('all');

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const clearCompleted = () => {
    setTodo([...activeTodos]);
    setRenderTodo([...activeTodos]);
  };

  const handleFilterTodo = (sellect: string) => {
    setFilterType(sellect);

    const newTodo: Todo[] = todos.filter(todo => {
      switch (sellect) {
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
            {`${activeTodos.length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                // className="selected"
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
