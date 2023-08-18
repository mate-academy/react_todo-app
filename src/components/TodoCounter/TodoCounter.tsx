import { useContext } from 'react';
import { TodoContext } from '../../TodoContext/TodoContext';

export const TodoCounter: React.FC = () => {
  const { items } = useContext(TodoContext);

  const activeItemsCount = items.filter(
    item => item.completed === false,
  ).length;

  return (
    <span className="todo-count" data-cy="todosCounter">
      {`${activeItemsCount} items left`}
    </span>
  );
};
