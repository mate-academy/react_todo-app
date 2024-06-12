import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useDispatch } from '../GlobalProvider';
import { FormEvent, useState } from 'react';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, id, completed } = todo;

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const deleteTodo = (todoId: number) => {
    dispatch({ type: 'deleteTodo', payload: todoId });
  };

  const toggleTodo = () => {
    dispatch({
      type: 'changeTodo',
      payload: { ...todo, completed: !completed },
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event?.preventDefault();

    if (editedTitle === title) {
      setIsEditing(false);

      return;
    }

    if (!editedTitle.trim()) {
      deleteTodo(id);

      return;
    }

    dispatch({
      type: 'changeTodo',
      payload: { ...todo, title: editedTitle },
    });

    setIsEditing(false);
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={() => toggleTodo()}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          onBlur={handleSubmit}
          onKeyUp={event => {
            if (event.key === 'Escape') {
              setIsEditing(false);
              setEditedTitle(title);
            }
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
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
            onClick={() => deleteTodo(id)}
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
