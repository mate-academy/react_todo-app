/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  todos: Todo[],
  onSetTodos: (newValue: Todo[]) => void
  onCheck: React.Dispatch<React.SetStateAction<boolean>>
};

export const TodoItem: React.FC<Props> = (({
  todo,
  todos,
  onSetTodos,
  onCheck,
}) => {
  const [isCompleted, setCompleted] = useState(todo.completed);
  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setCompleted(todo.completed);
  }, [todo.completed]);

  useEffect(() => {
    onSetTodos(todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, completed: isCompleted };
      }

      return item;
    }));

    if (!isCompleted) {
      onCheck(false);
    }
  }, [isCompleted]);

  const text = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (text.current) {
      text.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    onSetTodos(todos.filter(item => item.id !== todo.id));
  };

  const handleEditing = () => {
    setEditing(false);
    onSetTodos(todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, title };
      }

      return item;
    })
      .filter(item => item.title !== ''));
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
          onChange={event => setCompleted(event.target.checked)}
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
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={handleChange}
        onBlur={handleEditing}
        ref={text}
      />
    </li>
  );
});
