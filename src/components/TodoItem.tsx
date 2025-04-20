/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodoContext } from '../context/TodoContext';
import { TodoContextType } from '../types/Action';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }: Props) => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const { toggleTodo, deleteTodo, setTodos, todos } = useContext(
    TodoContext,
  ) as TodoContextType;

  const { id, completed, title } = todo;

  const editTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editTodoRef.current !== null) {
      editTodoRef.current.focus();
    }
  }, [editingTodoId]);

  const startEditTodo = (currentTodo: Todo) => {
    setEditingTodoId(currentTodo.id);
    setNewTitle(currentTodo.title);
  };

  const changeTitleTodo = (selectedTodo: Todo) => {
    if (newTitle.trim() === selectedTodo.title.trim()) {
      setEditingTodoId(null);

      return;
    }

    if (newTitle.trim() === '') {
      deleteTodo(selectedTodo.id);
    } else {
      const updatedTodo = {
        ...selectedTodo,
        title: newTitle.trim(),
      };

      const updatedTodos = todos.map(currentTodo =>
        currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
      );

      setTodos(updatedTodos);
    }

    setEditingTodoId(null);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {
            toggleTodo({ ...todo, completed: !completed });
          }}
        />
      </label>

      {editingTodoId === id ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            changeTitleTodo(todo);
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            onBlur={() => {
              changeTitleTodo(todo);
            }}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                setEditingTodoId(null);
              }
            }}
            ref={editTodoRef}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              startEditTodo(todo);
            }}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              deleteTodo(id);
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
