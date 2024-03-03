import React, { createContext, useReducer } from 'react';
import { Todo } from '../types/TodoType';
import { TodoDispatch } from '../types/DispatchType';
import { Action } from '../types/ActionType';
import { useLocalStorage } from '../hooks/useLocalStorage';

const newTodo = (title: string): Todo => ({
  id: new Date(),
  title,
  completed: false,
});

export default function reducer(filteredTodos: Todo[], action: Action) {
  switch (action.type) {
    case 'add-todo':
      return [...filteredTodos, newTodo(action.payload.title)];
    case 'delete-todo':
      return filteredTodos.filter(todo => todo.id !== action.payload.id);
    case 'edit-todo':
      return filteredTodos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
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
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todos, dispatch] = useReducer(reducer, storedTodos);

  React.useEffect(() => {
    setStoredTodos(todos);
  }, [todos, setStoredTodos]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
