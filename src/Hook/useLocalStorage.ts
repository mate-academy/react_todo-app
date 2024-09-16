import { Dispatch, useEffect, useReducer } from "react";
// eslint-disable-next-line import/no-cycle
import { Todo, Action } from "../components/TodosContext";

const STORAGE_KEY = "todos";

const initialTodos = () => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);

  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const useLocalStorage = (
  reducer: React.Reducer<Todo[], Action>,
  startTodos: Todo[],
): [Todo[], Dispatch<Action>] => {
  const [todos, dispatch] = useReducer(reducer, startTodos, initialTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return [todos, dispatch];
};
