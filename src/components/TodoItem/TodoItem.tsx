import classNames from 'classnames';
import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosProvider';

interface Props {
  todo: Todo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(todo.title);
  const { dispatch } = useContext(TodosContext);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditMode(false);
    }
  }, []);

  useEffect(() => {
    if (isEditMode) {
      window.addEventListener('keyup', handleEscape);
    } else {
      window.removeEventListener('keyup', handleEscape);
    }

    return () => window.removeEventListener('keyup', handleEscape);
  }, [handleEscape, isEditMode]);

  const handleDelete = () =>
    dispatch({ type: 'delete', payload: { id: todo.id } });

  const handleToggle = () =>
    dispatch({ type: 'toggle', payload: { id: todo.id } });

  const handleStartEdit = () => {
    setInputValue(todo.title);
    setIsEditMode(true);
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleSubmitEdit = (e: FormEvent) => {
    e.preventDefault();
    const title = inputValue.trim();

    if (title) {
      dispatch({ type: 'update', payload: { id: todo.id, title } });
    } else {
      dispatch({ type: 'delete', payload: { id: todo.id } });
    }

    setIsEditMode(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </label>

      {isEditMode ? (
        <form onSubmit={handleSubmitEdit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={inputValue}
            onChange={handleEditInputChange}
            autoFocus
            onBlur={handleSubmitEdit}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleStartEdit}
          >
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
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
};
