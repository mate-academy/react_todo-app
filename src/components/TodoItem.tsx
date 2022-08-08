/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  todos: Todo[],
  onSetTodos: (newValue: Todo[]) => void
};

export const TodoItem: React.FC<Props> = (({
  todo,
  todos,
  onSetTodos,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [isCompleted, setCompleted] = useState(todo.completed);

  const handleClick = () => {
    onSetTodos(todos.filter(item => item.id !== todo.id));
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleEditing = () => {
    if (title.trim()) {
      setEditing(false);
      onSetTodos(todos.map(item => {
        if (item.id === todo.id) {
          return { ...item, title };
        }

        return item;
      }));
    }
  };

  const handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        handleEditing();
        break;

      case 'Escape':
        setEditing(false);
        setTitle('');
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    onSetTodos(todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, completed: isCompleted };
      }

      return item;
    }));
  }, [isCompleted]);

  return (
    <li
      key={todo.id}
      className={classNames({
        completed: isCompleted,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={isCompleted}
          onChange={handleCheck}
        />

        <label
          onDoubleClick={() => {
            setEditing(true);
            setTitle(todo.title);
          }}
        >
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleClick}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={title}
        onChange={handleChangeInput}
        onKeyDown={handleChange}
        onBlur={handleEditing}
      />
    </li>
  );
});
