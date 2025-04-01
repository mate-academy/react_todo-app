/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { TodoType } from '../types/TodoType';
import classNames from 'classnames';
import { TodoContext } from '../context/TodoProvider';

type Props = {
  todo: TodoType;
};

// add here loading for few Todos

export const Todo: React.FC<Props> = ({ todo }) => {
  const { setTodos } = useContext(TodoContext);

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(e => e.id !== id));
  };

  const handleTogle = (id: number) => {
    setTodos(prev =>
      prev.map(e => {
        if (e.id === id) {
          return { ...e, completed: !e.completed };
        } else {
          return e;
        }
      }),
    );
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
          onClick={() => handleTogle(todo.id)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDelete(todo.id)}
      >
        ×
      </button>
    </div>
  );
};

// {/* This todo is being edited */}
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   {/* This form is shown instead of the title and remove button */}
//   <form>
//     <input
//       data-cy="TodoTitleField"
//       type="text"
//       className="todo__title-field"
//       placeholder="Empty todo will be deleted"
//       value="Todo is being edited now"
//     />
//   </form>
// </div>

// {/* This todo is in loadind state */}
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Todo is being saved now
//   </span>

//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>
// </div>
