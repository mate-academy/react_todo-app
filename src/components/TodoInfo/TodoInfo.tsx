import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { TodosContext } from '../../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const [todoEditing, setTodoEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState(title);
  const { setTodos } = useContext(TodosContext);

  const handleDelete = (todoId: Date) => {
    setTodos(prev => prev.filter(t => t.id !== todoId));
  };

  const handleCheck = (todoId: Date) => {
    setTodos(prev =>
      prev.map(t => {
        if (t.id === todoId) {
          return { ...t, completed: !t.completed };
        } else {
          return t;
        }
      }),
    );
  };

  const onSubmitTitle = () => {
    const trimTitle = newTitle.trim();

    setTodoEditing(false);

    if (todo.title === trimTitle) {
      return;
    }

    if (trimTitle === '') {
      handleDelete(todo.id);

      return;
    }

    setTodos(prev =>
      prev.map(t => {
        if (t.id !== todo.id) {
          return t;
        } else {
          return { ...t, title: trimTitle };
        }
      }),
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTodoEditing(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (todoEditing && inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [id, todoEditing]);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          name="checkbox"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleCheck(todo.id)}
        />
      </label>

      {todoEditing ? (
        <form>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSubmitTitle();
              }
            }}
            onBlur={() => onSubmitTitle()}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setTodoEditing(true);
          }}
        >
          {title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      {!todoEditing && (
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
