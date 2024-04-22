import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useState } from 'react';

type Props = {
  todo: Todo;
  onAdd: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({ todo, onAdd }) => {
  const [togl, setTogl] = useState(false);

  function togelStatement() {
    setTogl(!togl);

    const newTodo = { ...todo, completed: !todo.completed };

    onAdd(newTodo);
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: togl,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={togelStatement}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
    </div>
  );
};
