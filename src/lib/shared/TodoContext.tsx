import {
  createContext, useContext, useEffect, useMemo, useReducer,
} from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { Action } from '../enums/Action';
import { ActionType } from '../types/ActionType';
import { ITodo } from '../types/ITodo';

interface TodoContextType {
  todos: ITodo[];
  dispatchTodos: React.Dispatch<ActionType>;
}

const TodoContext = createContext<TodoContextType | null>(null);

function todoReducer(todos: ITodo[], action: ActionType) {
  switch (action.type) {
    case Action.ADD_TODO:
      return [
        ...todos,
        {
          id: Date.now(),
          title: action.payload,
          completed: false,
        },
      ];

    case Action.TOGGLE_TODO:
      return todos.map((todo) => (todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo));

    case Action.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload);

    case Action.CHANGE_TODO:
      return todos.map((todo) => (todo.id === action.payload.id
        ? { ...todo, title: action.payload.newTitle }
        : todo));

    case Action.CLEAR_COMPLETED_TODOS:
      return todos.filter((todo) => !todo.completed);

    case Action.COMPLETE_ALL_TODOS:
      return todos.map((todo) => ({ ...todo, completed: true }));

    default:
      return todos;
  }
}

export const TodoProvider: React.FC = ({ children }) => {
  const [todosFromStorage, setTodosFromStorage] = useLocalStorage<ITodo[]>([], 'todos');
  const [todos, dispatchTodos] = useReducer(todoReducer, todosFromStorage);

  const contextValue = useMemo(
    () => ({ todos, dispatchTodos }),
    [todos, dispatchTodos],
  );

  useEffect(() => {
    setTodosFromStorage(todos);
  }, [todos]);

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('Todo Context must be used inside a TodoProvider!');
  }

  return context;
};
