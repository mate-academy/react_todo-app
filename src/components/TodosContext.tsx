import React, { createContext, useState } from 'react';
import { Todo } from '../type/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';

type ContextTodos = {
  updateTodo: (editValue: string, selectedTodo: Todo) => void;
  selectedPost: null | Todo;
  setSelectedPost: (todo: Todo | null) => void;
  clearCompleted: () => void;
  makeToggleAll: (status: boolean) => void;
  deleteTodo: (id: number) => void;
  makeTodoCompleted: (id: number, status: boolean) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (title: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = createContext<ContextTodos>({
  updateTodo: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  clearCompleted: () => {},
  makeToggleAll: () => {},
  deleteTodo: () => {},
  makeTodoCompleted: () => {},
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [selectedPost, setSelectedPost] = useState<null | Todo>(null);

  function addTodo(title: string) {
    setTodos([...todos, { id: Date.now(), title: title, completed: false }]);
  }

  const makeTodoCompleted = (id: number, status: boolean) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: status,
          };
        } else {
          return todo;
        }
      }),
    );
  };

  const deleteTodo = (id: number) => {
    return setTodos(todos.filter(todo => todo.id !== id));
  };

  const makeToggleAll = (status: boolean) => {
    setTodos(todos.map((todo: Todo) => ({ ...todo, completed: status })));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
  };

  const itemsLeft = todos.filter(todo => !todo.completed);

  const updateTodo = (editValue: string, selectedTodo: Todo) => {
    return setTodos(
      todos.map(todo => {
        if (todo.id === selectedTodo?.id) {
          return {
            ...todo,
            title: editValue,
          };
        } else {
          return todo;
        }
      }),
    );
  };

  const todosTools = {
    updateTodo,
    selectedPost,
    setSelectedPost,
    clearCompleted,
    makeToggleAll,
    deleteTodo,
    makeTodoCompleted,
    todos,
    setTodos,
    addTodo,
    itemsLeft,
  };

  return (
    <TodosContext.Provider value={todosTools}>{children}</TodosContext.Provider>
  );
};
