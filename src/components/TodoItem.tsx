import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  handleDelete: (todoId: number) => void,
  handleEdit: (todoId: number, title: string) => void,
  handleComplete: (todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo, handleDelete, handleEdit, handleComplete,
}) => {
  const [editing, setEditing] = React.useState(false);
  const [title, setTitle] = React.useState(todo.title);
  const todoField = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, [editing]);

  const handleEditTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEdit(todo.id, title);
      setEditing(false);
    }

    if (event.key === 'Escape') {
      setTitle(todo.title);
      setEditing(false);
    }
  };

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing },
        { view2: todo.title !== title },
      )}
      onDoubleClick={() => setEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view toggle-completed toggle-editing"
          checked={todo.completed}
          onChange={() => handleComplete(todo.id)}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        ref={todoField}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={handleEditTitle}
      />
    </li>
  );
};
