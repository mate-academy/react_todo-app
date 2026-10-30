import React, { createContext, useContext, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { getTodos, saveTodos } from '../utils/LocalStorage';

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'deleteCompletedTodos' }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'toggleTodos' };

const reducer = (todos: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'addTodo':
      return [...todos, action.payload];

    case 'deleteTodo':
      return todos.filter(todo => todo.id !== action.payload);

    case 'deleteCompletedTodos':
      return todos.filter(todo => !todo.completed);

    case 'updateTodo':
      const todoIndex = todos.findIndex(todo => todo.id === action.payload.id);

      if (todoIndex === -1) {
        return todos;
      }

      const newTodos = [...todos];

      newTodos.splice(todoIndex, 1, action.payload);

      return newTodos;

    case 'toggleTodos':
      const completed = !todos.every(todo => todo.completed);

      return todos.map(todo => ({
        ...todo,
        completed,
      }));

    default:
      return todos;
  }
};

const TodosContext = createContext<Todo[]>([]);
const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, dispatch] = useReducer(reducer, [] as Todo[], () => getTodos());

  React.useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useDispatch = () => useContext(DispatchContext);
export const useGlobalTodos = () => useContext(TodosContext);
