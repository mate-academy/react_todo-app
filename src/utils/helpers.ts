import { useTodos } from '../components/TodosContext';

export const useUpdateTodo = () => {
  const { todos, setTodos } = useTodos();

  return (idTodo: number, booleanValue: boolean) => {
    const updated = todos.map(todo =>
      todo.id === idTodo ? { ...todo, isLoaded: booleanValue } : todo,
    );

    setTodos(updated);
  };
};
