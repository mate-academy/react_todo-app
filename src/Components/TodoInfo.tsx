import classNames from 'classnames';
import { Todo } from '../Types/Todo';
import { useContext, useEffect, useState } from 'react';
import { DispatchContext } from './TodoContext';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  // const [checked, setChecked] = useState(todo.status);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setEditedTitle(todo.title);
  }, [todo.title]);

  const saveChanges = () => {
    if (editedTitle.trim() !== '') {
      const updatedTodo = { ...todo, title: editedTitle };
      const todoFromStorage = JSON.parse(localStorage.getItem('todos') || '[]');
      const updatedTodos = todoFromStorage.map((t: Todo) =>
        t.id === todo.id ? updatedTodo : t,
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      dispatch({
        type: 'updateTodoTitle',
        payload: { updatedTodo: updatedTodo },
      });
    } else {
      setEditedTitle(todo.title);
    }

    setIsEditing(false);
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'updateTodoStatus',
      payload: { id: todo.id, newStatus: e.target.checked },
    });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleClick = () => {
    dispatch({ type: 'deleteTodo', payload: { id: todo.id } });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.status === true })}
    >
      <label
        className="todo__status-label"
        style={{ opacity: isEditing ? 0 : 1 }}
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className={classNames({ todo__status: !isEditing })}
          checked={todo.status}
          onChange={handleCheckBoxChange}
        />
      </label>

      {isEditing ? (
        <input
          type="text"
          className="todo__title todo__title-field"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          autoFocus
          onBlur={saveChanges}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              saveChanges();
            }
          }}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {editedTitle ? editedTitle : todo.title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleClick}
        >
          ×
        </button>
      )}
    </div>
  );
};
