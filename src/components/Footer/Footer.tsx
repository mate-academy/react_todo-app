import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodosFilter } from '../TodosFilter';

type Props = {
  onClearCompleted: () => void;
  activeTodos: Todo[];
  allCompleted: Todo[];
};

export const Footer: FC<Props> = ({
  onClearCompleted,
  activeTodos,
  allCompleted,
}) => (
  <footer className="footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${activeTodos.length} items left`}
    </span>

    <TodosFilter />

    {allCompleted.length && (
      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);
