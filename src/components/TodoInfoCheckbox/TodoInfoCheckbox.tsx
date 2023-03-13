import { Props } from './Props';

export const TodoInfoCheckbox: React.FC<Props> = ({ todo, onUpdate }) => (
  <label className="todo__status-label">
    <input
      type="checkbox"
      className="todo__status"
      onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
    />
  </label>
);
