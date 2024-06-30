import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useState } from 'react';

type Props = {
  todo: Todo;
  onCheckedChange: (t: Todo) => void;
  onDeleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onCheckedChange,
  onDeleteTodo,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onCheckedChange({ ...todo, completed: isChecked });
  };

  const handleButtonClick = () => {
    onDeleteTodo(todo.id);
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
          checked={isChecked}
          onChange={handleCheckboxChange}
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
        onClick={handleButtonClick}
      >
        ×
      </button>
    </div>
  );
};
