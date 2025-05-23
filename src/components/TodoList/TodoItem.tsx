/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useRef, useState } from 'react';
import { Todo } from '../../types';
import { TodoContext } from '../../context/TodoContextProvider';
import cn from 'classnames';

interface Props {
  todo: Todo;
}

export default function TodoItem(props: Props) {
  const { id, title, completed } = props.todo;

  const [isEditing, setIsEditing] = useState(false);

  const { todos, setTodos } = useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement>(null);

  function updateTodos() {
    if (inputRef.current) {
      const trimmedVal = inputRef.current?.value?.trim();

      const updatedTodos = trimmedVal
        ? todos.map(el => (el.id === id ? { ...el, title: trimmedVal } : el))
        : todos.filter(el => el.id !== id);

      setTodos(updatedTodos);
    }

    setIsEditing(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateTodos();
  }

  function handleDelete() {
    const updatedTodos = todos.filter(el => el.id !== id);

    setTodos(updatedTodos);
  }

  function handleToggle() {
    const updatedTodos = todos.map(el =>
      el.id === id ? { ...el, completed: !el.completed } : el,
    );

    setTodos(updatedTodos);
  }

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
          onClick={handleToggle}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={title}
            ref={inputRef}
            onKeyUp={e => e.key === 'Escape' && setIsEditing(false)}
            onBlur={() => updateTodos()}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
}
