import React, { FC } from 'react';
import { Todo } from '../../types/todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  handleDeleteTodo: (id: number) => void;
  handleToggleCompleted: (id: number) => void;
};

export const Main: FC<Props> = ({
  todos,
  handleDeleteTodo = () => {},
  handleToggleCompleted = () => {},
}) => {
  console.log(todos);
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
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
        </div>
      ))}

      {/* This todo is an active todo */}
      {/* <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Not Completed Todo
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div> */}

      {/* This todo is being edited */}
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        {/* This form is shown instead of the title and remove button */}
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      </div>

    </section>
  );
};
