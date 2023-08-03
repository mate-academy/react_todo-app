import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';

export const TodosCounter: React.FC = () => {
  const { items } = useContext(TodosContext);

  const activeItemsCount = items
    .filter(item => item.completed === false).length;

  return (
    <span className="todo-count" data-cy="todosCounter">
      {`${activeItemsCount} items left`}
    </span>
  );
};
