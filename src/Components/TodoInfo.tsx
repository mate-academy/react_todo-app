import classNames from 'classnames';
import { Todo } from '../Types/Todo';
import { useState } from 'react';

type Props = {
  todo: Todo;
  updateTodoStatus: (id: number, newStatus: boolean) => void;
  onDeleteTodo: (id: number) => void;
  todoId: number;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  updateTodoStatus,
  onDeleteTodo,
  todoId,
}) => {
  const [checked, setChecked] = useState(todo.status);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    updateTodoStatus(todo.id, e.target.checked);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.status === true })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={checked}
          onChange={handleCheckBoxChange}
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
        onClick={() => onDeleteTodo(todoId)}
      >
        ×
      </button>
    </div>
  );
};
