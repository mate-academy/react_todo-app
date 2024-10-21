/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { TodoContext } from '../Context/Context';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteSelectTodo, handleUpdateComplete, handleEditTitle } =
    useContext(TodoContext);

  const { id, completed, title } = todo;
  const [newTitle, setNewTitle] = useState(title);
  const [showEditId, setShowEditId] = useState<number | null>(null);

  const handleEditTitleTodo = () => {
    if (newTitle === title) {
      setShowEditId(null);

      return;
    }

    if (newTitle.length === 0) {
      deleteSelectTodo(id);
    } else if (showEditId && newTitle.trim()) {
      handleEditTitle(newTitle.trim(), todo);
      setShowEditId(null);
    }
  };

  const handleEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setNewTitle(title);
      setShowEditId(null);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleUpdateComplete(todo)}
        />
      </label>
      {showEditId === id ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleEditTitleTodo();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={handleEditTitleTodo}
            onKeyUp={handleEscape}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setShowEditId(id)}
          >
            {newTitle.trim()}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteSelectTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
