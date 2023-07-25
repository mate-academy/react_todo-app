import classNames from 'classnames';
import { useMemo } from 'react';
import { TodoFilter } from '../../types/TodoFilter';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  filterBy: TodoFilter;
  isActive: Todo[];
  setFilterBy: React.Dispatch<React.SetStateAction<TodoFilter>>;
  deleteTodo: (id: number) => void;
}

export const Footer: React.FC<Props> = ({
  filterBy,
  isActive,
  setFilterBy,
  deleteTodo,
  todos,
}) => {
  const handleClearCompleted = () => {
    todos.forEach((todo) => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });
  };

  const todosCompleted = useMemo(
    () => todos.filter(({ completed }) => completed),
    [todos],
  );

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{`${isActive.length} items left`}</span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === TodoFilter.ALL,
          })}
          onClick={() => setFilterBy(TodoFilter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterBy === TodoFilter.ACTIVE,
          })}
          onClick={() => setFilterBy(TodoFilter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterBy === TodoFilter.COMPLETED,
          })}
          onClick={() => setFilterBy(TodoFilter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={handleClearCompleted}
      >
        {!!todosCompleted.length && 'Clear completed'}
      </button>
    </footer>
  );
};
