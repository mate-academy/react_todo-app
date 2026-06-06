/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useTodoContext } from '../context/TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch, newTodoField } = useTodoContext();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const editingTodoElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodo) {
      editingTodoElement.current?.focus();
    }
  }, [editingTodo]);

  const handleDeleteTodo = () => {
    dispatch({ type: 'deleteTodo', payload: todo.id });
    newTodoField.current?.focus();
  };

  const handleToggleTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    dispatch({
      type: 'toggleTodo',
      payload: { id, checked: e.target.checked },
    });
  };

  const updateTodo = () => {
    const trimmedValue = editingTodo?.title.trim();

    if (!trimmedValue) {
      dispatch({ type: 'deleteTodo', payload: todo.id });
    } else {
      dispatch({
        type: 'editTodo',
        payload: { id: todo.id, title: trimmedValue },
      });
    }

    setEditingTodo(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateTodo();
  };

  return (
    <div data-cy="Todo" className={cn('todo', todo.completed && 'completed')}>
      <label className="todo__status-label">
        <input
          onChange={e => handleToggleTodo(e, todo.id)}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      {editingTodo?.id === todo.id ? (
        <form onSubmit={e => handleSubmit(e)}>
          <input
            ref={editingTodoElement}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            onKeyDown={e => {
              if (e.key === 'Escape') {
                setEditingTodo(null);
              }
            }}
            onBlur={() => {
              updateTodo();
              setEditingTodo(null);
            }}
            onChange={e =>
              setEditingTodo(prev =>
                prev ? { ...prev, title: e.target.value } : null,
              )
            }
            value={editingTodo.title}
          />
        </form>
      ) : (
        <>
          <span
            onDoubleClick={() => setEditingTodo(todo)}
            data-cy="TodoTitle"
            className="todo__title"
          >
            {todo.title}
          </span>

          <button
            onClick={handleDeleteTodo}
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
