import classNames from 'classnames';
import { useState } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo,
  toggleTodoStatus: (todoId: number) => void,
  deleteTodo: (todoId: number) => void,
  editTodo: (editedTitle: string, todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodoStatus,
  deleteTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const keyUpHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      if (!editText) {
        deleteTodo(todo.id);
      }
    }

    switch (event.key) {
      case 'Enter':
        editTodo(editText, todo.id);
        setIsEditing(false);
        break;

      case 'Escape':
        setEditText(todo.title);
        setIsEditing(false);
        break;

      default:
        break;
    }
  };

  const blurHandler = () => {
    if (!editText) {
      deleteTodo(todo.id);
    }

    editTodo(editText, todo.id);
    setIsEditing(false);
  };

  return (
    <>
      <li className={classNames(
        { completed: todo.completed, editing: isEditing },
      )}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={todo.completed}
            onChange={() => toggleTodoStatus(todo.id)}
          />
          <label
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          onKeyUp={keyUpHandler}
          onBlur={blurHandler}
        />
      </li>
    </>
  );
};
