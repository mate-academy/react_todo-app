import { useContext } from 'react';
import { Todo } from '../types/todo';
import cn from 'classnames';
import { DispatchContext } from '../context/TodoContext';
import { useTodoEdit } from '../hooks/useTodoEdit';

type Props = {
  todo: Todo;
};

export const TodoComponent: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { isEditing, setIsEditing, newTodoTitle, setNewTodoTitle, handleSave } =
    useTodoEdit(todo);

  const checkboxId = `todo__status-${todo.id}`;

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label" htmlFor={checkboxId}>
        <input
          id={checkboxId}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            dispatch({
              type: 'TOGGLE_TODO',
              payload: { id: todo.id },
            });
          }}
        />
        <span className="is-sr-only">Toggle todo status</span>
      </label>

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSave();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTodoTitle}
            onChange={e => setNewTodoTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={e => {
              if (e.key !== 'Escape') {
                return;
              }

              setIsEditing(false);
              setNewTodoTitle(todo.title);
            }}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() =>
            dispatch({
              type: 'DELETE_TODO',
              payload: { id: todo.id },
            })
          }
          hidden={isEditing}
        >
          ×
        </button>
      )}
    </div>
  );
};
