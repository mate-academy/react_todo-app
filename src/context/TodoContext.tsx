import React, { useEffect } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { loadTodos, savedTodos } from '../utils/storage';

export type TodosState = {
  todos: Todo[];
  filter: Filter;
};

const initialState: TodosState = {
  todos: [],
  filter: 'all',
};

type Action =
  | { type: 'addTodo'; payload: string }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'updateTodo'; payload: { id: number; title: string } }
  | { type: 'toggleTodo'; payload: number }
  | { type: 'clearCompleted' }
  | { type: 'toggleAll' }
  | { type: 'setFilter'; payload: Filter };

export const reducer = (state: TodosState, action: Action): TodosState => {
  switch (action.type) {
    case 'addTodo': {
      const newTodo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case 'deleteTodo': {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    }

    case 'updateTodo': {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title.trim() }
            : todo,
        ),
      };
    }

    case 'toggleTodo': {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    }

    case 'toggleAll': {
      const areAllCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !areAllCompleted,
        })),
      };
    }

    case 'clearCompleted': {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    }

    case 'setFilter': {
      return {
        ...state,
        filter: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const TodoStateContext = React.createContext<TodosState | undefined>(
  undefined,
);
// prettier-ignore
export const TodoDispatchContext = React.createContext<React.Dispatch<Action>
| undefined>(undefined);

export const useSetTodos = () => {
  const context = React.useContext(TodoStateContext);

  if (!context) {
    throw new Error('useTodoState must be used within TodoProvider');
  }

  return context;
};

export const useDispatchTodos = () => {
  const context = React.useContext(TodoDispatchContext);

  if (!context) {
    throw new Error('useTodoDispatch must be used within TodoProvider');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const TodoProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    todos: loadTodos(),
  });

  useEffect(() => {
    savedTodos(state.todos);
  }, [state.todos]);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};
