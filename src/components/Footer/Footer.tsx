import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { MethodsContext, TodosContext } from '../TodosContext/TodosContext';
import { TodoStatus } from '../../types/TodoStatus';
import { countActiveTodo } from '../../utils/countActiveTodo';

export const Footer: React.FC = () => {
  const { todos, activeFilter, setActiveFilter } = useContext(TodosContext);

  const { clearCompleted } = useContext(MethodsContext);

  const activeTodoCount = useMemo(() => countActiveTodo(todos), [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodoCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.keys(TodoStatus).map(key => (
          <a
            key={key}
            href={`#/${TodoStatus[key as keyof typeof TodoStatus]}`}
            className={classNames('filter__link', {
              selected:
                activeFilter === TodoStatus[key as keyof typeof TodoStatus],
            })}
            data-cy={`FilterLink${key}`}
            onClick={() =>
              setActiveFilter(TodoStatus[key as keyof typeof TodoStatus])
            }
          >
            {key}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={todos.length === activeTodoCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
