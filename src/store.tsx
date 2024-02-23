import React, { useState } from "react";
import { Status } from "./types/Status";
import { TodosContextType } from "./types/TodosContextType";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import { Todo } from "./types/Todo";
import { getVisibleTodos } from "./utils/getVisibleTodos";

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
  const filteredTodos = getVisibleTodos(todos, status);

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
