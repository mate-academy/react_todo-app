import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { initialTodo } from '../utils/initialTodo';
import { getTodosFromLocalStorage } from '../utils/getTodosFromLocalStorage';

interface TodosContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

interface TodoContextType {
  todoToAdd: Todo;
  setTodoToAdd: (todo: Todo) => void;
}

type Props = {
  children: React.ReactNode;
};

export const TodoContext = React.createContext<TodoContextType>({
  todoToAdd: initialTodo,
  setTodoToAdd: () => {},
});

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todoToAdd, setTodoToAdd] = useState<Todo>(initialTodo);
  const todoFromLocalStorage = getTodosFromLocalStorage();

  const [todos, setTodos] = useState<Todo[]>(todoFromLocalStorage);

  const todoValue = useMemo(
    () => ({
      todoToAdd,
      setTodoToAdd,
    }),
    [todoToAdd],
  );

  const todosValue = useMemo(() => ({ todos, setTodos }), [todos]);
  localStorage.setItem('todos', JSON.stringify(todos));

  return (
    <TodosContext.Provider value={todosValue}>
      <TodoContext.Provider value={todoValue}>{children}</TodoContext.Provider>
    </TodosContext.Provider>
  );
};
