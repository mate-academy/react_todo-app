/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC, FormEvent, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from './Todo';

interface PropsTodoItem {
  todo: Todo;
  handleToggle(id: number): void;
  handleDeleteTodo(id: number): void;
  editTitle(editById: number, tempTitle: string): void
}
export const TodoItem: FC<PropsTodoItem> = ({
  todo, handleToggle, handleDeleteTodo, editTitle,
}) => {
  const [editById, setIsEditById] = useState<number | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const todoInputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClickEdit = (tod: Todo) => {
    const { id, title } = tod;

    setIsEditById(id);
    setTempTitle(title);
  };

  const handleEditTitle = (event: FormEvent) => {
    event.preventDefault();
    if (editById !== null) {
      editTitle(editById, tempTitle);
    }

    setIsEditById(null);
    setTempTitle('');
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditById(0);
    }
  };

  useEffect(() => {
    if (todoInputRef.current) {
      if (editById) {
        todoInputRef.current.focus();
      } else {
        todoInputRef.current.blur();
      }
    }
  }, [editById]);

  const isEdit = editById === todo.id;

  const { id, title, completed } = todo;

  return (
    <li
      className={classNames({ completed }, { editing: isEdit })}
      key={id}

    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onClick={() => handleToggle(id)}
          checked={completed}

        />
        <label
          onDoubleClick={() => handleDoubleClickEdit(todo)}
        >
          {title}

        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(id)}
        />
      </div>
      <form onSubmit={handleEditTitle}>
        <input
          type="text"
          className="edit"
          value={tempTitle}
          onChange={(event) => setTempTitle(event.target.value)}
          onKeyUp={handleKeyUp}
          onBlur={handleEditTitle}
          ref={todoInputRef}
        />
      </form>

    </li>
  );
};
