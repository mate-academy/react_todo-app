import { Todo } from '../types/Todo';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { removeTodo } = useContext(TodoContext);
  const handleRemoveButton = () => {
    removeTodo(todo.id);
  };

  return (
    <div data-cy="Todo" className="todo">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleRemoveButton}
      >
        ×
      </button>
    </div>
  );
};
