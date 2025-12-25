import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const { deleteTodo, updatedTodo, toggleTodo } = useContext(TodoContext);

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const handleKeyUp = (event: React.KeyboardEvent, editingTodo: Todo) => {
    if (event.key === 'Escape') {
      setEditingId(null);
      setEditingTitle(editingTodo.title);
    }
  };

  const handleUpdate = (todoToUpdate: Todo, title: string) => {
    if (!title.trim()) {
      deleteTodo(todoToUpdate.id);
    }

    updatedTodo(todoToUpdate, title);

    setEditingId(null);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label" aria-label="Toggle todo status">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={() => toggleTodo(todo.id)}
        />
      </label>

      {editingId === todo.id ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleUpdate(todo, editingTitle);
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={event => setEditingTitle(event.target.value)}
            onBlur={() => handleUpdate(todo, editingTitle)}
            onKeyUp={event => handleKeyUp(event, todo)}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setEditingId(todo.id);
          }}
        >
          {todo.title}
        </span>
      )}

      {editingId !== todo.id && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDelete(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
