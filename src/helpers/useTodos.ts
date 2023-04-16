import { Todo } from '../types/Todo';
import { useLocalStorage } from './useLocalStorage';

type UseTodos = [
  Todo[],
  (newTodo: Todo)=> void,
  (todoIds: number[]) => void,
  (todos: Todo[]) => void,
];

export const useTodos = (): UseTodos => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = (newTodo: Todo) => {
    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
  };

  const removeTodo = (todoIds: number[]) => {
    const updatedTodos = todos.filter(todo => !todoIds.includes(todo.id));

    setTodos(updatedTodos);
  };

  const toggleTodo = (items: Todo[]) => {
    const newTodos = todos.map(todo => {
      const item = items.find(({ id }) => id === todo.id);

      if (item) {
        return item;
      }

      return todo;
    });

    setTodos(newTodos);
  };

  return [todos, addTodo, removeTodo, toggleTodo];
};
