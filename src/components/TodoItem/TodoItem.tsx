import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';
import { useState } from 'react';

type Props = {
  todo: Todo;
  toggleTodo: (todoId: number) => void;
  updateTodo: (todoId: number, newTitle: string) => void;
  deleteTodo: (id: number) => void;
};

export const TodoItem = ({
  todo,
  toggleTodo,
  updateTodo,
  deleteTodo,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');

  const handleUpdate = () => {
    updateTodo(todo.id, editingTitle);
    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => toggleTodo(todo.id)}
          checked={todo.completed}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={e => setEditingTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyUp={e => e.key === 'Escape' && setIsEditing(false)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEditing(true);
              setEditingTitle(todo.title);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <Loader isLoading={false} />
    </div>
  );
};
