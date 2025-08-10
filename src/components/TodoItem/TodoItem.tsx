import { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';
import { Actions } from '../../constants/Actions';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/label-has-associated-control */

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const context = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  if (!context) {
    throw new Error('TodosContext must be used within a TodosProvider');
  }

  const { dispatch } = context;

  const handleSave = () => {
    const trimmed = newTitle.trim();

    if (trimmed === '') {
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
          onClick={() => dispatch({ type: Actions.DELETE, payload: todo.id })}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TodoItem;
