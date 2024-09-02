import React, {useState} from "react";
import { Todo } from "../../Types/todo";

interface TodoContextType {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
}

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {}
});

type Props = {
  children: React.ReactNode;
}


export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const value = {
    todos,
    setTodos
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
};
