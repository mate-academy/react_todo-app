import { Todo } from '../types/Todo';
import { useTodos } from '../utils/TodoContext';

type Props = {
  item: Todo
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { deleteTodo } = useTodos();

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
        />

        <label htmlFor="toggle-view">{item.title}</label>

        <button
          type="button"
          aria-label="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(item.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
