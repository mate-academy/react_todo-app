import classNames from 'classnames';
import { Todo } from '../../types/TodoType';
import { useTodos } from '../../utils/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodos();

  const handleTodoStatus = () => {
    toggleTodo(todo.id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={handleTodoStatus}
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDeleteTodo}
      >
        ×
      </button>
    </div>
  );
};
