import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodosContext } from '../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo, updatedTodo } = useContext(TodosContext);

  const [updatingTodo, setUpdatingTodo] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (updatingTodo) {
      input.current?.focus();
    }
  }, [updatingTodo]);

  return !updatingTodo ? (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        ' completed': todo.completed,
      })}
      onDoubleClick={() => setUpdatingTodo(true)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTodo(todo.id)}
      >
        ×
      </button>
    </div>
  ) : (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        ' completed': todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
      </label>

      {/* This form is shown instead of the title and remove button */}
      <form
        onSubmit={() => {
          updatedTodo(todo, title);
          setUpdatingTodo(false);
        }}
      >
        <input
          ref={input}
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          onBlur={() => {
            updatedTodo(todo, title);
            setUpdatingTodo(false);
          }}
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyUp={e => {
            if (e.key === 'Escape') {
              setTitle(todo.title);
              setUpdatingTodo(false);
            }
          }}
        />
      </form>
    </div>
  );
};
