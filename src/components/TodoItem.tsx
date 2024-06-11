import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useDispatch } from '../GlobalProvider';
import { FormEvent, useState } from 'react';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const deleteTodo = (id: number) => {
    dispatch({ type: 'deleteTodo', payload: id });
  };

  const toggleTodo = () => {
    dispatch({
      type: 'changeTodo',
      payload: { ...todo, completed: !todo.completed },
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event?.preventDefault();

    if (editedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!editedTitle.trim()) {
      deleteTodo(todo.id);

      return;
    }

    dispatch({
      type: 'changeTodo',
      payload: { ...todo, title: editedTitle },
    });

    setIsEditing(false);
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
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
              setEditedTitle(todo.title);
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
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={() => deleteTodo(todo.id)}
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
