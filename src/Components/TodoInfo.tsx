import classNames from 'classnames';
import { Todo } from '../Types/Todo';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DispatchContext } from './TodoContext';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (!isEditing) {
      setEditedTitle(todo.title);
    }
  }, [todo.title, isEditing]);

  const saveChanges = useCallback(() => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle) {
      dispatch({
        type: 'updateTodoTitle',
        payload: { updatedTodo: { ...todo, title: trimmedTitle } },
      });
    } else {
      dispatch({
        type: 'deleteTodo',
        payload: { id: todo.id },
      });
    }

    setIsEditing(false);
  }, [dispatch, editedTitle, todo]);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'updateTodoStatus',
      payload: { id: todo.id, newStatus: e.target.checked },
    });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleClick = () => {
    dispatch({ type: 'deleteTodo', payload: { id: todo.id } });
  };

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        saveChanges();
      }

      if (e.key === 'Escape') {
        setIsEditing(false);
        setEditedTitle(todo.title);
      }
    },
    [saveChanges, todo.title],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveChanges();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label
        className="todo__status-label"
        style={{ opacity: isEditing ? 0 : 1 }}
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className={classNames({ todo__status: !isEditing })}
          checked={todo.completed}
          onChange={handleCheckBoxChange}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title todo__title-field"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={saveChanges}
            autoFocus
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleClick}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
