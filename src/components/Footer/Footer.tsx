import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter';

type Props = {
  finishedTodos: Todo[],
  unfinishedTodos: Todo[],
  onAllTodoRemoving: () => void,
};

export const Footer: React.FC<Props> = ({
  finishedTodos,
  unfinishedTodos,
  onAllTodoRemoving,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {unfinishedTodos.length >= 2
          ? `${unfinishedTodos.length} items left`
          : `${unfinishedTodos.length} item left`}
      </span>

      <TodoFilter />

      {finishedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={onAllTodoRemoving}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
