import cls from 'classnames';
import Todo from '../types/Todo';
import { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

type TodoItemProps = {
  todo: Todo;
};
export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const { toggleCompleted, deleteTodo, editTodo } = useContext(TodosContext);

  const startEditing = () => {
    setIsEditing(true);
    setEditedTitle(todo.title);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
  };

  const save = () => {
    const trimmed = editedTitle.trim();

    if (trimmed === '') {
      deleteTodo(todo.id);
    } else {
      editTodo({ ...todo, title: trimmed });
    }

    setIsEditing(false);
  };

  const keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div
      data-cy="Todo"
      className={cls('todo', { completed: todo.completed })}
      key={todo.id}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            toggleCompleted(todo.id);
          }}
          autoFocus
        />
      </label>
      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startEditing}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            save();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={save}
            onKeyUp={keyUpHandler}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
