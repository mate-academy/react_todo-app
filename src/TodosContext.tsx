import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';
import { TodosContextType } from './types/TodosContextType';

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
  deleteTodo: () => {},
  updateTodoTitle: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(currTodo => (currTodo.id === id
      ? { ...currTodo, completed: !currTodo.completed }
      : currTodo)));
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: newTitle }
      : prevTodo)));
  };

  const toggleAll = () => {
    const hasAllCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !hasAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        toggleAll,
        clearCompleted,
        deleteTodo,
        updateTodoTitle,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
