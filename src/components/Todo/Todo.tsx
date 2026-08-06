/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import './Todo.scss';
import { useSetTodos } from '../../hooks/useSetTodos';

interface Props {
  id: number;
  title: string;
  completed: boolean;
}

export const Todo = ({ id, title, completed }: Props) => {
  const setTodos = useSetTodos();

  const handleToggleCompleted = () => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo,
      ),
    );
  };

  const handleDelete = () => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggleCompleted}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
      >
        ×
      </button>
    </div>
  );
};
