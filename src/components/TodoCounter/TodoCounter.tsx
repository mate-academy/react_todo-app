import { useTodo } from '../../hooks/useTodo';

export const TodoCounter: React.FC = () => {
  const { items } = useTodo();

  const activeItemsCount = items.filter(
    item => item.completed === false,
  ).length;

  return (
    <span className="todo-count" data-cy="todosCounter">
      {`${activeItemsCount} ${activeItemsCount === 1 ? 'item' : 'items'} left`}
    </span>
  );
};
