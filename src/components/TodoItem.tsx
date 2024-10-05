// #region imports
import cn from 'classnames';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';
// #endregion

type Props = {
  todo: Todo;
  isEdited?: boolean;
  onEditedChange?: (id: number | null) => void;
};

export const TodoItem: React.FC<Props> = memo(function TodoItem({ todo }) {
  const { id, title, completed } = todo;

  // #region hooks
  const { todos, changeTodos } = useContext(TodosContext);
  const [isEdited, setIsEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const todoDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startEditing = () => {
      setIsEdited(true);
    };

    const stopEditing = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEdited(false);
        setEditedTitle(title);
      }
    };

    const todoDiv = todoDivRef.current;

    todoDiv?.addEventListener('dblclick', startEditing);

    document.addEventListener('keyup', stopEditing);

    return () => {
      todoDiv?.removeEventListener('dblclick', startEditing);

      document.removeEventListener('keyup', stopEditing);
    };
  }, [title]);
  // #endregion

  // #region handlings
  const handleDelete = () => {
    changeTodos(todos.filter(t => t.id !== id));
  };

  const handleEditing = (property: keyof Todo, newValue: string | boolean) => {
    const index = todos.findIndex(t => t.id === id);
    const newTodos = [...todos];

    const editedValue =
      typeof newValue === 'string' ? newValue.trim() : newValue;

    if (editedValue === '') {
      newTodos.splice(index, 1);
    } else {
      const newTodo = {
        ...todos[index],
        [property]: editedValue,
      };

      newTodos.splice(index, 1, newTodo);
    }

    changeTodos(newTodos);
  };

  const onSubmit = () => {
    handleEditing('title', editedTitle);
    setIsEdited(false);
  };
  // #endregion

  return (
    <div
      ref={todoDivRef}
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={e => handleEditing('completed', e.target.checked)}
        />
      </label>

      {isEdited ? (
        <form onSubmit={onSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={e => {
              setEditedTitle(e.target.value);
            }}
            onBlur={onSubmit}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
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
});
