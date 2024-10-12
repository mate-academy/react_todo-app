import { createContext, useEffect, useReducer } from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import { Todo } from '../../types/Todo';

type Props = {
  children: React.ReactNode;
};

export type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'deleteCompletedTodos' }
  | { type: 'filterBy'; payload: TodoStatus }
  | { type: 'updateStatusTodo'; payload: Todo }
  | { type: 'toggleAllStatuses' }
  | { type: 'editTitle'; payload: number; title: string };

const data = localStorage.getItem('todos');
const initialTodos: Todo[] = JSON.parse(data as string) || [];

const initialState = {
  todos: initialTodos,
  filterStatus: TodoStatus.All,
};

type RootState = typeof initialState;

export const TodosContext = createContext<RootState>(initialState);

export const TodosDispatchContext = createContext<React.Dispatch<Action>>(
  () => {},
);

const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'addTodo':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'filterBy':
      return { ...state, filterStatus: action.payload };
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload) || [],
      };
    case 'deleteCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed) || [],
      };
    case 'updateStatusTodo':
      return {
        ...state,
        todos:
          state.todos.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, completed: !action.payload.completed }
              : todo,
          ) || [],
      };
    case 'toggleAllStatuses':
      const complTodosLength =
        state.todos.filter(el => el.completed).length || 0;
      const completedToValue =
        state.todos.length === complTodosLength ? false : true;

      return {
        ...state,
        todos:
          state.todos.map(todo => {
            return { ...todo, completed: completedToValue };
          }) || [],
      };
    case 'editTitle':
      return {
        ...state,
        todos:
          state.todos.map(todo =>
            todo.id === action.payload
              ? { ...todo, title: action.title }
              : todo,
          ) || [],
      };
    default: {
      throw Error('Unknown action');
    }
  }
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todoState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoState.todos));
  }, [todoState]);

  return (
    <TodosContext.Provider value={todoState}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};
