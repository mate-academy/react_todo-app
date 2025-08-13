/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { Actions } from '../../constants/Actions';
import classNames from 'classnames';
import { useTodosContext } from '../../context/useTodosContext';

interface Props {
  todo: Todo;
  focusInput: () => void;
}

const TodoItem = ({ todo, focusInput }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const { dispatch } = useTodosContext();

  const handleSave = () => {
    const trimmed = newTitle.trim();

    if (!trimmed) {
      dispatch({ type: Actions.DELETE, payload: todo.id });
    } else if (trimmed !== todo.title) {
      dispatch({
        type: Actions.UPDATE,
        payload: { id: todo.id, title: trimmed },
      });
    }

    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch({ type: Actions.DELETE, payload: todo.id });
    focusInput();
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
          checked={todo.completed}
          onChange={() => {
            dispatch({ type: Actions.TOGGLE, payload: todo.id });
          }}
        />
      </label>
      {isEditing ? (
        <input
          autoFocus
          type="text"
          className="todo__title-field"
          data-cy="TodoTitleField"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          placeholder="Empty todo will be deleted"
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleEdit}
        >
          {todo.title}
        </span>
      )}
      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDelete}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TodoItem;
