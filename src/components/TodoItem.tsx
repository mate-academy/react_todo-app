import cn from 'classnames';
import { Todo } from '../types/Todo';
import { EditForm } from './EditForm';
import { useGlobalDispatch, useGlobalState } from '../Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed },
}) => {
  const { editingTodoId } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const handleDeleteTodo = (index: number) => {
    dispatch({ type: 'deleteTodo', payload: index });
  };

  const handleChangeCheckbox = (index: number) => {
    dispatch({ type: 'changeCheckbox', payload: index });
  };

  const handleDoubleClick = (editId: number, editTitle: string) => {
    dispatch({ type: 'setCurrentTitle', payload: editTitle });
    dispatch({ type: 'setEditingTodoId', payload: editId });
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={() => handleChangeCheckbox(id)}
        />
      </label>

      {editingTodoId === id ? (
        <EditForm newTodo={{ id, title, completed }} />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleDoubleClick(id, title)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
