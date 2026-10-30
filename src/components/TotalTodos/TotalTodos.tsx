import { useTodos } from '../../store/TodosStore';

export const TotalTodos = () => {
  const todos = useTodos();

  return <span>Total todos: {todos.length}</span>;
};
