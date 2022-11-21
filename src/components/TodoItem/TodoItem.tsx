import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  updateTodo,
  removeTodo,
}) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const initialTitle = todo.title;

  const handleOnBlurOrEnter = () => {
    setIsEditTitle(false);
    if (editedTitle === initialTitle) {
      return;
    }

    if (editedTitle.trim().length === 0) {
      removeTodo(todo);

      return;
    }

    updateTodo({ ...todo, title: editedTitle });
  };

  const handleOnEscapeOrEnter
  = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditTitle(false);
      setEditedTitle(todo.title);
    }

    if (event.key === 'Enter') {
      setIsEditTitle(false);
      handleOnBlurOrEnter();
    }
  };

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isEditTitle },
      )}
      onDoubleClick={() => setIsEditTitle(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          aria-label="Delete item"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo)}
        />
      </div>
      <input
        type="text"
        value={editedTitle}
        className="edit"
        onKeyDown={(e) => handleOnEscapeOrEnter(e)}
        onChange={(event) => setEditedTitle(event.target.value)}
        onBlur={() => handleOnBlurOrEnter()}
        ref={input => input && input.focus()}
      />
    </li>
  );
};
