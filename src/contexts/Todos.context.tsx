import { createContext, useState } from 'react';
import { Todo } from '../types/Todo';

type TodosContextType = {
  todos: Todo[],
  setTodos: (todos: Todo[] | ((v: Todo[]) => Todo[])) => void,
  isCompletedAll: boolean,
  completedTodos: Todo[],
  activeTodos: Todo[],
}


export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => { },
  isCompletedAll: false,
  completedTodos: [],
  activeTodos: [],
});

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const isCompletedAll = todos.every(todo => todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <TodosContext.Provider value={{ todos, setTodos, isCompletedAll, completedTodos, activeTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
