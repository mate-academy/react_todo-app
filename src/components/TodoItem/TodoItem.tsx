import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  todos: Todo[]
  setTodos: (data: Todo[]) => void
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
  todos,
  setTodos,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDoubleClick = () => setIsEditing(true);

  const updateTitle = () => {
    setIsEditing(false);

    if (title === todo.title) {
      return;
    }

    if (!title) {
      const updatedTodos = todos.filter(currnetTodo => (
        currnetTodo.id !== todo.id
      ));

      setTodos(updatedTodos);

      return;
    }

    const updatedTodos = todos.map(item => {
      if (todo.id !== item.id) {
        return item;
      }

      return {
        ...item,
        title,
      };
    });

    setTodos(updatedTodos);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setIsEditing(false);
      setTitle(todo.title);
    }

    if (event.code === 'Enter') {
      setIsEditing(false);
      updateTitle();
    }
  };

  const handleBlur = () => updateTitle();

  const handleRemove = () => {
    const updatedTodos = todos.filter(currnetTodo => (
      currnetTodo.id !== todo.id
    ));

    setTodos(updatedTodos);
  };

  const handleCheckboxChange = () => {
    const updatedTodos = todos.map(item => {
      if (todo.id !== item.id) {
        return item;
      }

      return {
        ...item,
        completed: !item.completed,
      };
    });

    setTodos(updatedTodos);
  };

  return (
    <li
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />

        <label>{todo.title}</label>

        <button
          type="button"
          aria-label="destroy"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemove}
        />
      </div>

      {isEditing && (
        <input
          type="text"
          className="edit"
          placeholder="Empty todo will be deleted"
          ref={inputRef}
          value={title}
          onChange={handleTitleChange}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      )}
    </li>
  );
});
