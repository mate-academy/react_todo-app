import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { Status, TodoContextType } from '../../types/types';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const {
    counterTodos,
    setStatus,
    status,
    counterCompletedTodos,
    clearCompleted,
  } = useContext(TodoContext) as TodoContextType;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counterTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(statusValue => (
          <a
            key={statusValue}
            href={`#/${statusValue.toLocaleLowerCase()}`}
            className={classNames('filter__link', {
              selected: status === statusValue,
            })}
            data-cy={`FilterLink${statusValue}`}
            onClick={() => {
              setStatus(statusValue);
            }}
          >
            {statusValue}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={counterCompletedTodos === 0}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
