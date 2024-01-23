import React from 'react';
import { Todo } from './types/todoType';

type TodoContextType = {
  filteredTodo:Todo[];
  deleteTodo: (id:number) => void
  setItemLeft: (count: number) => void
  itemLeft:number
  setTodos:(v: Todo[]) => void
  todos:Todo[]
};

export const TodoContext = React.createContext<TodoContextType>({
  filteredTodo: [],
  deleteTodo: () => {},
  setItemLeft: () => {},
  itemLeft: 0,
  setTodos: () => {},
  todos: [],
});
