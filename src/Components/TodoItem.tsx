import classNames from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../TodoContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext must be used within a TodoProvider');
  }

  const {
    processingIds,
    setProcessingIds,
    setTodos,
    editingTodoId,
    setEditingTodoId,
    setEditingTitle,
    setErrorMessage,
    focusInput,
    editingTitle,
    toggleTodo,
    saveTitle,
    tempTodo,
  } = context;

  const handleDelete = async () => {
    setProcessingIds(prev => [...prev, todo.id]);

    try {
      setTodos(currentTodos => currentTodos.filter(t => t.id !== todo.id));
      if (editingTodoId === todo.id) {
        setEditingTodoId(null);
        setEditingTitle('');
      }
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== todo.id));
      focusInput();
    }
  };

  const handleOnBlur = async () => {
    const next = editingTitle.trim();

    if (next.length === 0) {
      await handleDelete();
    } else {
      await saveTitle(todo, next);
    }
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditingTodoId(null);
      setEditingTitle('');

      return;
    }

    if (event.key === 'Enter') {
      await handleOnBlur();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todo.id === editingTodoId && inputRef.current) {
      const input = inputRef.current;

      input.focus();
    }
  }, [editingTodoId, todo.id]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
        active: !todo.completed,
      })}
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
            toggleTodo(todo);
            focusInput();
          }}
        />
      </label>

      {todo.id !== editingTodoId ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditingTodoId(todo.id);
              setEditingTitle(todo.title);
            }}
          >
            {todo.title}
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
      ) : (
        <input
          ref={inputRef}
          type="text"
          className="todo__title-field"
          data-cy="TodoTitleField"
          value={editingTitle}
          onChange={event => {
            setEditingTitle(event.target.value);
          }}
          onKeyDown={onKeyDown}
          onBlur={handleOnBlur}
        />
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active':
            processingIds.includes(todo.id) || tempTodo?.id === todo.id,
        })}
        style={{ pointerEvents: 'none' }}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
