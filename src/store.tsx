import React, { useCallback, useEffect, useState } from "react";
import { Status } from "./types/Status";
import { TodosContextType } from "./types/TodosContextType";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import { Todo } from "./types/Todo";

const initialTodos: TodosContextType = {
  todos: [],
  filteredTodos: [],
  addTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {},
  setTodos: () => {},
  status: Status.All,
  setStatus: () => {},
};

export const TodosContext = React.createContext(initialTodos);

interface Props {
  children: React.ReactNode;
}

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [status, setStatus] = useState(Status.All);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => setTodos([...todos, newTodo]);

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, title: newText } : todo;
      }),
    );
  };

  const filterTodos = useCallback(() => {
    switch (status) {
      case Status.Active:
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      case Status.Completed:
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;

      default:
        setFilteredTodos(todos);
    }
  }, [status, todos]);

  useEffect(() => filterTodos(), [todos, status, filterTodos]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        filteredTodos,
        addTodo,
        removeTodo,
        editTodo,
        setTodos,
        status,
        setStatus,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
