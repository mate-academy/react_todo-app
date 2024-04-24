import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onUpdate: (newTodo: Todo) => void;
  deleteTodo: (deletedTodo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({ todo, onUpdate, deleteTodo }) => {
  function togelStatement() {
    const newTodo = { ...todo, completed: !todo.completed };

    onUpdate(newTodo);
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={togelStatement}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTodo(todo)}
      >
        ×
      </button>
    </div>
  );
};
