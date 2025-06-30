import React, { createContext, useContext, useEffect, useReducer } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodosState = Todo[];

type TodosAction =
  | { type: 'ADD'; title: string }
  | { type: 'DELETE'; id: number }
  | { type: 'TOGGLE'; id: number }
  | { type: 'TOGGLE_ALL'; completed: boolean }
  | { type: 'UPDATE'; id: number; title: string }
  | { type: 'CLEAR_COMPLETED' };

const TodosContext = createContext<{
  todos: Todo[];
  dispatch: React.Dispatch<TodosAction>;
}>({ todos: [], dispatch: () => null });

const todosReducer = (state: TodosState, action: TodosAction): TodosState => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { id: +new Date(), title: action.title.trim(), completed: false },
      ];
    case 'DELETE':
      return state.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case 'TOGGLE_ALL':
      return state.map(todo => ({ ...todo, completed: action.completed }));
    case 'UPDATE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, title: action.title.trim() } : todo,
      );
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, [], () => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
