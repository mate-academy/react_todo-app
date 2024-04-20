import React, { createContext } from "react";
// eslint-disable-next-line import/no-cycle
import { useLocalStorage } from "../Hook/useLocalStorage";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export enum Status {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

export type Action =
  | { type: "addItem" | "updateItem"; payload: Todo }
  | { type: "removeItem"; payload: { todoId: number } }
  | { type: "updateAll"; payload: { completed: boolean } }
  | { type: "deleteCompleted" };

type ContextValue = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
};

export const TodosContext = createContext({} as ContextValue);

type Props = React.PropsWithChildren;

const todosHandler = (todos: Todo[], action: Action) => {
  switch (action.type) {
    case "addItem":
      return [
        ...todos,
        {
          id: action.payload.id,
          title: action.payload.title,
          completed: action.payload.completed,
        },
      ];

    case "updateItem":
      return todos.map((todo) =>
        todo.id === action.payload.id ? { ...todos, ...action.payload } : todo,
      );

    case "removeItem":
      return todos.filter((todo) => todo.id !== action.payload.todoId);

    case "updateAll":
      return todos.map((todo) => {
        return {
          ...todo,
          completed: action.payload.completed,
        };
      });

    case "deleteCompleted":
      return todos.filter((todo) => !todo.completed);

    default:
      return todos;
  }
};

export const TodosProvider = ({ children }: Props) => {
  const [todos, dispatch] = useLocalStorage(todosHandler, []);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
