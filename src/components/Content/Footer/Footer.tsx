import React, { useMemo } from 'react';
import classNames from 'classnames';
import { getFilteredTodos } from '../../../utils/filterTodos';
import { FilterLink } from '../FilterLink';
import { TodoStatus } from '../../../types/TodoStatus';
import { Todo } from '../../../types/Todo';

type Props = {
  todos: Todo[];
  onTodoFilter: (filterStatus: TodoStatus) => void;
  onDeleteTodo: (todoId: number) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  onTodoFilter,
  onDeleteTodo,
}) => {
  const activeTodos = useMemo(() => (
    getFilteredTodos(todos, TodoStatus.ACTIVE)
  ), [todos]);

  const completedTodos = useMemo(() => (
    getFilteredTodos(todos, TodoStatus.COMPLETED)
  ), [todos]);

  const allCompleted = completedTodos.map(completeTodo => completeTodo.id);

  const handleDeleteAllCompleted = (allCompletedId: number[]) => {
    allCompletedId.forEach(todoId => onDeleteTodo(todoId));
  };

  const filterLinkList = ['All', 'Active', 'Completed'];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterLinkList.map(linkItem => (
          <FilterLink
            text={linkItem}
            onTodoFilter={onTodoFilter}
          />
        ))}
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { 'todoapp__clear-completed--hidden': !completedTodos.length },
        )}
        disabled={!completedTodos.length}
        onClick={() => handleDeleteAllCompleted(allCompleted)}
      >
        Clear completed
      </button>
    </footer>
  );
};
