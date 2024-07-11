import cn from 'classnames';
import { TodoModel } from '../../types/Todo.model';

import { useTodoItem } from './useTodoItem';
import { EditTodoForm } from '../EditTodoForm';

interface Props {
  todo: TodoModel;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { isEdit, onCompletedChange, onDelete, onEdit, onCompleteEdit } =
    useTodoItem({ todo });

  const { id, completed, title } = todo;

  return (
    <div
      key={id}
      data-cy="Todo"
      className={cn('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={onCompletedChange}
        />
      </label>

      {isEdit ? (
        <EditTodoForm onCancel={onCompleteEdit} todo={todo} />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={onEdit}
        >
          {title}
        </span>
      )}

      {!isEdit && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={onDelete}
        >
          ×
        </button>
      )}
    </div>
  );
};
