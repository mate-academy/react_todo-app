import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { Todo } from '../type/Todo';
import cn from 'classnames';

type Props = {
  item: Todo;
};
export const TodoItem: React.FC<Props> = ({ item }) => {
  const { makeTodoCompleted, deleteTodo } = useContext(TodosContext);

  const handleCompleted = () => {
    makeTodoCompleted(item.id, !item.completed);
  };

  return (
    <li className={cn({ completed: item.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleCompleted}
          checked={item.completed}
        />
        <label htmlFor="toggle-view">{item.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(item.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
