/* eslint-disable jsx-a11y/label-has-associated-control */
import './Todo.scss';

export const Todo = () => {
  return (
    /* This is a completed todo */
    <div data-cy="Todo" className="todo completed">
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        Completed Todo
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
    </div>
  );
};
