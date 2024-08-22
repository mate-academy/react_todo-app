import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from '../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleChangeStatus = () =>
    setTodos(
      todos.map(currentTodo => {
        if (currentTodo.id === id) {
          return { id, title, completed: !completed };
        }

        return currentTodo;
      }),
    );

  const handleSubmit = () => {
    if (title === newTitle) {
      setIsEditing(false);
    } else if (!newTitle) {
      setTodos(todos.filter(currentTodo => currentTodo.id !== id));
      setIsEditing(false);
    } else {
      setTodos(
        todos.map(currentTodo => {
          if (currentTodo.id === id) {
            return { id, title: newTitle.trim(), completed };
          }

          return currentTodo;
        }),
      );
      setIsEditing(false);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={handleChangeStatus}
        />
      </label>

      {!isEditing && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => {
            setTodos(todos.filter(currentTodo => currentTodo.id !== id));
          }}
        >
          ×
        </button>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={newTitle}
            onBlur={handleSubmit}
            onChange={event => {
              setNewTitle(event.target.value);
            }}
            onKeyUp={handleKeyUp}
          />
        </form>
      )}
    </div>
  );
};
