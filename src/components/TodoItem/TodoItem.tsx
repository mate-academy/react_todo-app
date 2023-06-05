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

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setIsEditing(false);
      setTitle(todo.title);
    }
  };

  const updateTitle = () => {
    setIsEditing(false);

    if (title === todo.title) {
      return undefined;
    }

    if (!title) {
      const updatedTodos = todos.filter(currnetTodo => (
        currnetTodo.id !== todo.id
      ));

      return setTodos(updatedTodos);
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

    return setTodos(updatedTodos);
  };

  const handleBlur = () => updateTitle();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTitle();
  };

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
    <div
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onChange={handleCheckboxChange}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputRef}
            value={title}
            onChange={handleTitleChange}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="deleteTodo"
            onClick={handleRemove}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
});
