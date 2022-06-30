import React, { useState } from 'react';
import classNames from 'classnames';
import ITodo from '../models/Todo';

type Props = {
  todo: ITodo;
  handleRemoveTodo: (id: number) => void;
  updateTodo: (id: number, payload: {}) => void;
}

const TodoItem: React.FC<Props> = ({
  todo,
  handleRemoveTodo,
  updateTodo,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const changeTodo = () => {
    if (title === '') {
      handleRemoveTodo(todo.id);
    } else {
      updateTodo(todo.id, { title });
    }

    setIsEditing(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isEditing },
      )}
      onDoubleClick={() => setIsEditing(true)}

    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            updateTodo(todo.id, { completed: !todo.completed });
          }}
        />

        <label>
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          onClick={() => handleRemoveTodo(todo.id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={title}
        onChange={handleTitle}
        onKeyDown={(event) => {
          const { key } = event.nativeEvent;

          if (key === 'Enter') {
            changeTodo();
          } else if (key === 'Escape') {
            setTitle(todo.title);
            setIsEditing(false);
          }
        }}
        onBlur={() => {
          changeTodo();
        }}
      />
    </li>
  );
};

export default TodoItem;
