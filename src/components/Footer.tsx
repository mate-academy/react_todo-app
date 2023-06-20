import classNames from 'classnames';
import { Filter } from './Filter';
import { useTodosContext } from '../context';

export const Footer = () => {
  const {
    handleRemoveCompletedTodos,
    activeTodos,
    completedTodos,
  } = useTodosContext();

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos.length} items left`}
      </span>

      <Filter />

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { todoapp__hidden: !completedTodos.length },
        )}
        onClick={handleRemoveCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
