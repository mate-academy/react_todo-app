/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../Store';
import cn from 'classnames';

type Props = {
  todo: Todo;
  focusNewTodoField: () => void;
};

export const TodoItem: React.FC<Props> = ({ todo, focusNewTodoField }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);

  const dispatch = useContext(DispatchContext);

  const handleDeleteTodo = (todoId: number) => {
    dispatch({ type: 'delete', payload: todoId });

    focusNewTodoField();
  };

  const handleToggleTodo = (todoId: number) =>
    dispatch({ type: 'toggle', payload: todoId });

  const escapeEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setTodoTitle(todo.title);
    }
  };

  const saveEditedTodo = () => {
    if (todo.title === todoTitle) {
      setIsEditing(false);

      return;
    }

    if (todoTitle.trim().length === 0) {
      handleDeleteTodo(todo.id);

      return;
    }

    dispatch({
      type: 'rename',
      payload: { id: todo.id, title: todoTitle.trim() },
    });
    setIsEditing(false);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    saveEditedTodo();
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={event => handleEditSubmit(event)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
            onBlur={saveEditedTodo}
            onKeyUp={event => escapeEditing(event)}
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
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
