import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from './types/todo';

type Props = {
  todo: Todo;
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (newTitle: string, todoId: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onCheck,
  onDelete,
  onEdit,
}) => {
  const [isEditied, setIsEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const onTitleChange = (title: string) => {
    setNewTitle(title);
  };

  const onNewTitleSubmit = (title: string) => {
    setIsEdited(false);
    const updatedtitle = title.trim();

    if (updatedtitle) {
      if (todo.title !== updatedtitle) {
        onEdit(updatedtitle, todo.id);
      }
    } else {
      onDelete(todo.id);
    }
  };

  const onPressedKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEdited(false);
      setNewTitle(todo.title);
    }

    if (event.key === 'Enter') {
      onNewTitleSubmit(newTitle);
    }
  };

  return (
    <li
      key={todo.id}
      className={classNames(
        { completed: todo.completed }, { editing: isEditied },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id="toggle-view"
          onChange={() => {
            onCheck(todo.id);
          }}

        />
        <label
          onDoubleClick={() => {
            setIsEdited(true);
          }}
        >
          {todo.title}
        </label>
        <button
          aria-label="destroy"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            onDelete(todo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        onChange={(event) => onTitleChange(event.target.value)}
        onBlur={() => onNewTitleSubmit(newTitle)}
        onKeyDown={(event) => onPressedKey(event)}
      />
    </li>
  );
};
