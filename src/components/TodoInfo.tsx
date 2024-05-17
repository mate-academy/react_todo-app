import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

  const { deleteTodo, toggleTodo, changeTodo, editRef } =
    useContext(TodoContext);

  const { completed } = todo;

  useEffect(() => {
    if (editRef?.current) {
      editRef.current.focus();
    }
  }, [isEdit, editRef]);

  const handleChangeTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle === '') {
      deleteTodo(todo.id);
    } else {
      changeTodo(todo.id, newTodoTitle);
    }

    setIsEdit(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    if (event.key === `Escape`) {
      setNewTodoTitle(todo.title);
      changeTodo(todoId, todo.title);
    }
  };

  const handleBlur = (value: string) => {
    if (value !== todo.title) {
      changeTodo(todo.id, value);
      setIsEdit(false);
    }

    if (!value) {
      deleteTodo(todo.id);
    }

    setNewTodoTitle(todo.title);
    setIsEdit(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          ref={editRef}
          checked={completed}
          onClick={() => toggleTodo(todo.id)}
        />
      </label>

      {isEdit ? (
        <form onSubmit={handleChangeTodo}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={editRef}
            value={newTodoTitle}
            onBlur={() => handleBlur(newTodoTitle)}
            onKeyDown={event => handleKeyDown(event, todo.id)}
            onChange={event => setNewTodoTitle(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEdit(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
