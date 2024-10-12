/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { TodosDispatchContext } from '../TodoAppContext/TodoAppContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(TodosDispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    field.current?.focus();
  }, [isEditing]);

  const handleEditClose = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      dispatch({ type: 'deleteTodo', payload: todo.id });
      setIsEditing(false);

      return;
    }

    if (todo.title === title) {
      setIsEditing(false);

      return;
    }

    dispatch({ type: 'editTitle', payload: todo.id, title: title.trim() });
    setTitle(title.trim());
    setIsEditing(false);
  };

  const handleKeyChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
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
          onClick={() => {
            dispatch({ type: 'updateStatusTodo', payload: todo });
          }}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'deleteTodo', payload: todo.id })}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleEditClose}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={field}
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleEditClose}
            onKeyUp={handleKeyChange}
          />
        </form>
      )}
    </div>
  );
};
