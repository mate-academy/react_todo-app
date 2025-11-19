import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { Todo } from '../types/Todo';
import { FilterState } from '../types/FilterState';

interface TodosContextType {
  todos: Todo[];
  visibleTodos: Todo[];
  filter: FilterState;
  newTodoFormRef: React.RefObject<HTMLInputElement>;
  dispatch: Dispatch<TodosAction>;
}

interface StateType {
  todos: Todo[];
  filter: FilterState;
}

type TodosAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'TOGGLE_ALL_TODOS' }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'DELETE_COMPLETED_TODOS' }
  | { type: 'EDIT_TODO'; payload: { id: string; newTitle: string } }
  | { type: 'SET_FILTER'; payload: FilterState };

const reducer = (state: StateType, action: TodosAction) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo = {
        id: crypto.randomUUID(),
        title: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case 'DELETE_TODO': {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    }

    case 'DELETE_COMPLETED_TODOS': {
      const newTodos = state.todos.filter(todo => !todo.completed);

      return { ...state, todos: newTodos };
    }

    case 'TOGGLE_TODO': {
      const newTodos = state.todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

      return { ...state, todos: newTodos };
    }

    case 'TOGGLE_ALL_TODOS': {
      const isAllTodosCompleted = state.todos.every(todo => todo.completed);
      const newTodos = state.todos.map(todo => ({
        ...todo,
        completed: !isAllTodosCompleted,
      }));

      return { ...state, todos: newTodos };
    }

    case 'SET_FILTER': {
      return { ...state, filter: action.payload };
    }

    case 'EDIT_TODO': {
      const oldTodo = state.todos.find(todo => todo.id === action.payload.id);
      const todos = [...state.todos];

      if (oldTodo) {
        const indexOfTodo = todos.indexOf(oldTodo);
        const updatedTodo = { ...oldTodo, title: action.payload.newTitle };

        return {
          ...state,
          todos: [
            ...todos.slice(0, indexOfTodo),
            updatedTodo,
            ...todos.slice(indexOfTodo + 1, todos.length),
          ],
        };
      }

      return state;
    }

    default:
      throw new Error('Unknown action');
  }
};

const initialTodos = (): Todo[] => {
  const todosFromStorage = localStorage.getItem('todos');
  const todos = todosFromStorage ? JSON.parse(todosFromStorage) : [];

  return todos;
};

const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ todos, filter }, dispatch] = useReducer(reducer, {
    filter: FilterState.All,
    todos: initialTodos(),
  });

  const newTodoFormRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch {
      throw new Error('Failed to save todos');
    }
  }, [todos]);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FilterState.All:
        return todo;
      case FilterState.Active:
        return !todo.completed;
      case FilterState.Completed:
        return todo.completed;
      default:
        throw new Error('Unknown filter');
    }
  });

  return (
    <TodosContext.Provider
      value={{ todos, visibleTodos, newTodoFormRef, filter, dispatch }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};
