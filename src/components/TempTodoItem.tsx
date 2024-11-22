/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';

type Props = {
  tempTodo: string;
};

export const TempTodoItem: React.FC<Props> = ({ tempTodo }) => {
  return (
    <div data-cy="Todo" className="todo">
      <label className="todo__status-label">
        <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {tempTodo}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        x
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay is-active">
        <div
          className={classNames('modal-background', 'has-background-white-ter')}
        />
        <div className="loader" />
      </div>
    </div>
  );
};
