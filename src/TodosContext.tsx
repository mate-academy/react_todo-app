import React from 'react';
import { Todo } from './types/Todo';
import { Actions } from './types/Actions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Action } from './enums/Action';

export interface TodoContext {
  todos: Todo[];
  updateTodos: React.Dispatch<Actions>;
}

export const TodosContext = React.createContext<TodoContext>({} as TodoContext);

const todosReducer: React.Reducer<Todo[], Actions> = (state, action) => {
  switch (action.type) {
    case Action.Create: {
      const newTodo = {
        id: action.payload.id,
        title: action.payload.title,
        completed: false,
      };

      return [...state, newTodo];
    }

    case Action.Update: {
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
      );
    }

    case Action.UpdateAll: {
      return state.map(todo => {
        return {
          ...todo,
          completed: action.payload.newStatus,
        };
      });
    }

    case Action.Delete: {
      return state.filter(todo => todo.id !== action.payload.id);
    }

    case Action.DeleteCompleted: {
      return state.filter(todo => !todo.completed);
    }

    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, updateTodos] = useLocalStorage(todosReducer, []);

  return (
    <TodosContext.Provider value={{ todos, updateTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
