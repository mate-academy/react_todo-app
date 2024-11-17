import classNames from 'classnames';
import { Todos } from '../../types/Todos';
import { DispatchContext } from '../../context/GlobalProvider';
import { useContext } from 'react';

type Props = {
  todo: Todos;
  onDelete: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete }) => {
  const { title, completed, id } = todo;
  const todoStatusDispatch = useContext(DispatchContext);

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() =>
            todoStatusDispatch({ type: 'toggleStatusTodo', payload: id })
          }
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => onDelete(todo.id)}
      >
        ×
      </button>
    </div>
  );
};
