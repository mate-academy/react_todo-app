import { useContext, useState } from 'react';
import { DispatchContext } from './GloballProvider';
import cn from 'classnames';
import { ToDo } from '../Types/ToDo';

type Props = {
  todo: ToDo;
  inputRef: React.RefObject<HTMLInputElement>;
  editInputRef: React.RefObject<HTMLInputElement>;
  setEditingTodoId: (id: number | null) => void;
  editingTodoId: number | null;
};

export const ToDoElem: React.FC<Props> = ({
  todo,
  inputRef,
  editInputRef,
  setEditingTodoId,
  editingTodoId,
}) => {
  const dispatch = useContext(DispatchContext);
  const [editValue, setEditValue] = useState<string>('');
  const { id, title, completed } = todo;

  const handleEdit = (todoId: number, todoName: string) => {
    setEditingTodoId(todoId);
    setEditValue(todoName);
  };

  const handleEditSubmit = (todoId: number) => {
    const trimmedValue = editValue.trim();

    if (trimmedValue) {
      dispatch({
        type: 'editTodoName',
        payload: { todoId, newTodoName: trimmedValue },
      });
    } else {
      dispatch({ type: 'onTodoDelete', payload: todoId });
    }

    setEditingTodoId(null);
    setEditValue('');
  };

  const handleTodoDelete = (todoId: number) => {
    dispatch({
      type: 'onTodoDelete',
      payload: todoId,
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
          onChange={() => {
            dispatch({
              type: 'onCheckboxChange',
              payload: +`${id}`,
            });
          }}
          checked={completed}
        />
      </label>
      {editingTodoId === id ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleEditSubmit(id);
          }}
        >
          <input
            ref={editInputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={() => handleEditSubmit(id)}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setEditingTodoId(null);
                setEditValue('');
              }
            }}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleEdit(id, title)}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleTodoDelete(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
