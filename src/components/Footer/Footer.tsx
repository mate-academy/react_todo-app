import { TodoFilters } from '../TodoFilters';

type FooterProps = {
  notCompletedTodos: number;
  completedTodos: number;
  onClearCompleted: () => void;
};

export const Footer: React.FC<FooterProps> = ({
  notCompletedTodos,
  completedTodos,
  onClearCompleted,
}) => {
  const isAnyCompletedTodo = completedTodos !== 0;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodos} items left`}
      </span>

      <TodoFilters />

      {isAnyCompletedTodo && (
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
};
