import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { TodoContext } from '../Context';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo, updateTodo } = useContext(TodoContext);
  const { title } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      {/*eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            updateTodo(todo.id, editedTitle);
            setIsEditing(false);
          }}
        >
          <input
            data-cy="TodoTitleField"
            value={editedTitle}
            className="todo__title-field"
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={() => {
              updateTodo(todo.id, editedTitle);
              setIsEditing(false);
            }}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setIsEditing(false);
                setEditedTitle(title);
              }
            }}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}
      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
