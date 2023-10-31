import React from 'react';
import { useLocaleStorage } from './localStorage';
import { Todo, Todos } from '../types/todoTypes';

type Props = {
  children: React.ReactNode;
};

type TodosContextValue = {
  todos: Todos;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  toogleAll: () => void;
  deleteTodo: (id: number) => void;
  deleteComplitedTodo: () => void;
  updateTodoTitle: (updatedTitle: string, id: number) => void;
};

export const TodosContext = React.createContext<TodosContextValue>({
  todos: [],
  addTodo: () => { },
  toggleTodo: () => { },
  toogleAll: () => {},
  deleteTodo: () => {},
  deleteComplitedTodo: () => {},
  updateTodoTitle: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todos>('todos', []);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = [...todos];
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      updatedTodos[index].completed = !updatedTodos[index].completed;
    }

    setTodos(updatedTodos);
  };

  const toogleAll = () => {
    const allCompleted = todos.every(todo => todo.completed === true);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = [...todos];
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      updatedTodos.splice(index, 1);
    }

    setTodos(updatedTodos);
  };

  const deleteComplitedTodo = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const updateTodoTitle = (updatedTitle: string, id: number) => {
    const updatedTodos = [...todos];
    const todoToUpdate = updatedTodos.find(todo => todo.id === id);

    if (todoToUpdate) {
      todoToUpdate.title = updatedTitle;
    }

    setTodos(updatedTodos);
  };

  const contextValue: TodosContextValue = {
    todos,
    addTodo,
    toggleTodo,
    toogleAll,
    deleteTodo,
    deleteComplitedTodo,
    updateTodoTitle,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodo = (): TodosContextValue => React.useContext(TodosContext);
