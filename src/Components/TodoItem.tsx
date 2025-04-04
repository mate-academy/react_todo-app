/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { callbacks } from '../localStorage/localStorage';
import { Context } from './ContextProvider';

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (todoId: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = React.memo(
  ({ todo: { id, title, completed }, todo, deleteTodo }) => {
    const [editingTitle, setEditingTitle] = useState<string>('');
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

    const { todos, setTodos, inputRef, setErrorMessage } = useContext(Context);

    const updateTodo = (updatedTodo: Todo) => {
      setErrorMessage('');
      const todoIndex = todos.findIndex(t => t.id === updatedTodo.id);

      const updatedTodos = [
        ...todos.slice(0, todoIndex),
        updatedTodo,
        ...todos.slice(todoIndex + 1),
      ];

      setTodos(updatedTodos);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);

      return callbacks.setTodos(updatedTodos);
    };

    const handleChangeTodoCompleted = (todoId: number) => {
      const todoToUpdate = todos.find((item: Todo) => item.id === todoId);

      if (!todoToUpdate) {
        return;
      }

      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };

      updateTodo(updatedTodo);
    };

    function handleEdit(
      currentTodo: Todo,
      event?: React.ChangeEvent<HTMLInputElement>,
    ) {
      if (!event) {
        setEditingTitle(currentTodo.title);
        setEditingTodoId(currentTodo.id);

        return;
      }

      if (event.type === 'change') {
        setEditingTitle(event.target.value);

        return;
      }

      if (event.type === 'blur' || ('key' in event && event.key === 'Enter')) {
        const trimmedTitle = editingTitle.trim();

        if (trimmedTitle === currentTodo.title) {
          setEditingTodoId(null);

          return;
        }

        if (trimmedTitle) {
          const updatedTodo = { ...currentTodo, title: trimmedTitle };

          updateTodo(updatedTodo);
          setEditingTodoId(null);
        } else {
          deleteTodo(currentTodo.id);
        }
      }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === 'Enter') {
        event.currentTarget.blur();
      } else if (event.key === 'Escape') {
        setEditingTodoId(null);
      }
    }

    return (
      <div
        key={id}
        data-cy="Todo"
        className={`todo ${completed && 'completed'}`}
      >
        <label className="todo__status-label">
          <input
            name="editTodo"
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={() => handleChangeTodoCompleted(id)}
          />
        </label>

        {editingTodoId === id ? (
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={event => handleEdit(todo, event)}
            onBlur={event => handleEdit(todo, event)}
            onKeyDown={event => handleKeyDown(event)}
            autoFocus
          />
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleEdit(todo)}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(id)}
            >
              x
            </button>
          </>
        )}

        <div data-cy="TodoLoader" className={`modal overlay`}>
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  },
);

TodoItem.displayName = 'TodoItem';
