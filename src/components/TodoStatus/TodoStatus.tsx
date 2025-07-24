import { Todo } from '../types/Todo';

interface TodoStatusProps {
  todo: Todo;
  todoStatus: (todo: Todo) => void;
}

export const TodoStatus: React.FC<TodoStatusProps> = ({ todo, todoStatus }) => {
  return (
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        aria-label="Toggle todo status"
        onChange={() => todoStatus(todo)}
      />
    </label>
  );
};
