import { useContext } from 'react';
import { FilterStatus } from '../../types/Filter';
import cn from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  filter: FilterStatus;
  changeStatusOfTodos: (value: FilterStatus) => void;
  clearCompletedTodo: () => void;
};

export const Footer: React.FC<Props> = ({
  filter,
  changeStatusOfTodos,
  clearCompletedTodo,
}) => {
  const { todos } = useContext(TodosContext);

  const todosNotCompleted = todos.filter(todo => !todo.completed);
  const todosCompleted = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosNotCompleted.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === FilterStatus.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => changeStatusOfTodos(FilterStatus.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === FilterStatus.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => changeStatusOfTodos(FilterStatus.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === FilterStatus.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => changeStatusOfTodos(FilterStatus.COMPLETED)}
        >
          Completed
        </a>
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompletedTodo}
        disabled={!todosCompleted.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
