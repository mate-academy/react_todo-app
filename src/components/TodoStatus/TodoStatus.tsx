interface TodoStatusProps {
  isCompletedTodo: boolean;
  todoStatus: () => void;
}

export const TodoStatus: React.FC<TodoStatusProps> = ({
  isCompletedTodo,
  todoStatus,
}) => {
  return (
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={isCompletedTodo}
        aria-label="Toggle todo status"
        onChange={todoStatus}
      />
    </label>
  );
};
