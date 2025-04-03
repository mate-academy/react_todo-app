/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';
import { TodoContext } from '../Context/TodoContext';
import { UpdateTodoForm } from './UpdateTodoForm';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const { handleOnDelete, handleUpdateTodo } = useContext(TodoContext);
  const { completed, title } = todo;

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() =>
            handleUpdateTodo({ ...todo, completed: !todo.completed })
          }
          checked={completed}
        />
      </label>

      {isUpdate ? (
        <UpdateTodoForm updateTodo={todo} setIsUpdate={setIsUpdate} />
      ) : (
        <>
          <span
            onDoubleClick={() => setIsUpdate(true)}
            data-cy="TodoTitle"
            className="todo__title"
            contentEditable={isUpdate}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleOnDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
