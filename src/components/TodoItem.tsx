import cn from 'classnames';
import { Todo } from '../types/Todo';
import { EditForm } from './EditForm';

type Props = {
  todo: Todo;
  handleChangeCheckbox: (id: number) => void;
  isEdited: boolean;
  editingTodoId: number | null;
  handleUpdateSubmit: (event: React.FormEvent, newTodo: Todo) => void;
  editRef: React.RefObject<HTMLInputElement>;
  currentTitle: string;
  handleUpdate: (newTodo: Todo) => void;
  setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
  handleDoubleClick: (id: number, title: string) => void;
  handleDeleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed },
  handleChangeCheckbox,
  isEdited,
  editingTodoId,
  handleUpdateSubmit,
  editRef,
  currentTitle,
  handleUpdate,
  setCurrentTitle,
  handleDoubleClick,
  handleDeleteTodo,
}) => {
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

      {isEdited && editingTodoId === id ? (
        <EditForm
          handleUpdateSubmit={handleUpdateSubmit}
          newTodo={{ id, title, completed }}
          editRef={editRef}
          currentTitle={currentTitle}
          handleUpdate={handleUpdate}
          setCurrentTitle={setCurrentTitle}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => handleDoubleClick(id, title)}
        >
          {title}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDeleteTodo(id)}
      >
        ×
      </button>
    </div>
  );
};
