import { createContext, useReducer } from 'react';
import { Todo } from '../types/TodoType';
import { TodoDispatch } from '../types/DispatchType';
import { Action } from '../types/ActionType';

const newTodo = (name: string): Todo => ({
  id: new Date(),
  name,
  completed: false,
});

export default function reducer(filteredTodos: Todo[], action: Action) {
  switch (action.type) {
    case 'add-todo':
      return [...filteredTodos, newTodo(action.payload.name)];
    case 'delete-todo':
      return filteredTodos.filter(todo => todo.id !== action.payload.id);
    case 'edit-todo':
      return filteredTodos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, name: action.payload.name }
          : todo,
      );
    case 'toggle-todo':
      return filteredTodos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'toggle-all-todo':
      return filteredTodos.map(todo => ({
        ...todo,
        completed: action.payload.completed,
      }));

    case 'clear-completed':
      return filteredTodos.filter(todo => !todo.completed);
    default:
      return filteredTodos;
  }
}

export const TodosContext = createContext<{
  todos: Todo[];
  dispatch: TodoDispatch;
}>({ todos: [], dispatch: () => null });

interface TodosProviderProps {
  children: React.ReactNode;
}
export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
