/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useDispatchContext, useTodoContext } from '../context/GlobalContext';
import { Filter } from '../types/Filter';

const TodosFilter = memo(() => {
  const { todos } = useTodoContext();
  const { dispatch } = useDispatchContext();
  const location = useLocation();
  const activeFilter = location.pathname.slice(1);
  const notCompletedTodos = todos.filter(todo => !todo.completed).length;

  const clearCompleted = useCallback(() => {
    todos
      .filter(todo => todo.completed)
      .forEach(el => dispatch({ type: 'remove', payload: { id: el.id } }));
  }, [dispatch, todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {notCompletedTodos} items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({
              selected:
                activeFilter !== Filter.ACTIVE && activeFilter !== Filter.COMPLETED,
            })}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: activeFilter === Filter.ACTIVE })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: activeFilter === Filter.COMPLETED })}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
});

export default TodosFilter;
