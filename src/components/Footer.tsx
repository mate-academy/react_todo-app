import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';

type Props = {
  activeTodos: Todo[];
  handleDeleteAllCompleted: () => void;
  completedTodos: Todo[];
};

export const Footer: FC<Props> = ({
  activeTodos,
  handleDeleteAllCompleted,
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} item${activeTodos.length !== 1 ? 's' : ''} left`}
      </span>
      <TodoFilter />
      <button
        disabled={!completedTodos.length}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleDeleteAllCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
