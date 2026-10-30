import { useTodos } from '../store/TodosStore';

export const TodoCounter: React.FC = () => {
  const todos = useTodos();
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>
  );
};
