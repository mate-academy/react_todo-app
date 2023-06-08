/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  removeTodo: (todoId: number) => void;
  changeTodo: (todoId: number, updatedFields: Partial<Todo>) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo, removeTodo, changeTodo,
}) => {
  const handleRemoveTodo = () => {
    removeTodo(todo.id);
  };

  const [title, setTitle] = useState(todo.title);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');

  const handleDoubleClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsInputVisible(!isInputVisible);
      changeTodo(todo.id, { title });
      setEditingTitle(title);

      if (title === '') {
        removeTodo(todo.id);
      }
    }

    if (event.key === 'Escape') {
      setIsInputVisible(!isInputVisible);
      setTitle(editingTitle);
    }
  };

  return (

    <li className={classNames({
      completed: todo.completed,
    },
    { editing: isInputVisible })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onClick={() => {
            changeTodo(todo.id, { completed: !todo.completed });
          }}
          checked={todo.completed}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemoveTodo}
        />
      </div>

      {isInputVisible && (
        <input
          type="text"
          className="edit"
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsInputVisible(false)}
        />
      )}
      {' '}
    </li>
  );
};
