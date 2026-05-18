/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTodos } from '../context/TodosContext';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  focusNewTodoField: () => void;
}

export const TodoItem: React.FC<Props> = ({ todo, focusNewTodoField }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const titleFieldRef = useRef<HTMLInputElement>(null);

  const { removeTodo, toggleTodo, updateTodoTitle } = useTodos();
  const statusId = `todo-status-${todo.id}`;

  useEffect(() => {
    if (isEditing) {
      titleFieldRef.current?.focus();
    }
  }, [isEditing]);

  const finishEditing = () => {
    updateTodoTitle(todo.id, title);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setTitle(todo.title);
    setIsEditing(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    finishEditing();
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      cancelEditing();
    }
  };

  const handleDelete = () => {
    removeTodo(todo.id);
    focusNewTodoField();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label" htmlFor={statusId}>
        <input
          id={statusId}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={titleFieldRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onBlur={finishEditing}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
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
};
