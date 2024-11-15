import { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';

import { Todo } from '../../../types/Todo';
import { TODO_FILTER_OPTIONS } from '../../../constants/TodoFilter';

import { FilterStatuses } from '../../../utils/enums/FilterStatuses';
import {
  getInCompletedTodos,
  hasCompletedTodos,
} from '../../../utils/todos/getTodos';
import { useDeleteTodo } from '../../../hooks/useDeleteTodo';

interface TodoFooterProps {
  todos: Todo[];
  setStatus: Dispatch<SetStateAction<FilterStatuses>>;
  status: FilterStatuses;
}

export const TodoFooter: FC<TodoFooterProps> = ({
  todos,
  setStatus,
  status,
}) => {
  const isCompletedTodoCounter = getInCompletedTodos(todos).length;
  const { handleDeleteCompletedTodos } = useDeleteTodo();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {isCompletedTodoCounter}
        {isCompletedTodoCounter === 1 ? ' item ' : ' items '}
        left
      </span>

      <nav className="filter" data-cy="Filter">
        {TODO_FILTER_OPTIONS.map(({ value, title, href, id }) => (
          <a
            href={href}
            className={cn('filter__link', { selected: status === value })}
            data-cy={`FilterLink${title}`}
            key={id}
            onClick={() => setStatus(value)}
          >
            {title}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos(todos)}
        onClick={handleDeleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
