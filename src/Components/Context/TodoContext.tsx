import React, { useState } from 'react';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { Todo } from '../../Types/todo';

type TodoContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: () => void;
  todoValue: string;
  setTodoValue: (value: string) => void;
  clearCompleted: () => void;
  deleteTodo: (id: number) => void;
  allChecked: boolean;
  handleSelectAll: () => void;
  handleChange: (toId: number, todoCompleted: boolean) => void;
  onTitleChange: (id: number, title: string) => void
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  todoValue: '',
  setTodoValue: () => {},
  clearCompleted: () => {},
  deleteTodo: () => {},
  handleSelectAll: () => {},
  allChecked: false,
  handleChange: () => { },
  onTitleChange: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todoValue, setTodoValue] = useState('');

  const addTodo = () => {
    if (todoValue.trim() !== '') {
      const newTodo: Todo = {
        id: +new Date(),
        title: todoValue,
        completed: false,
      };

      setTodos((prevTodos: Todo[]) => {
        return [newTodo, ...prevTodos];
      });

      setTodoValue('');
    }
  };

  const deleteTodo = (todoId: number) => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.filter(todo => todo.id !== todoId),
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos: Todo[]) => prevTodos.filter(todo => !todo.completed));
  };

  const allChecked = todos.every(todo => todo.completed);

  const handleSelectAll = () => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.map(todo => ({ ...todo, completed: !allChecked })),
    );
  };

  const handleChange = (toId: number, todoCompleted: boolean) => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.map(todo =>
        todo.id === toId ? { ...todo, completed: !todoCompleted } : todo,
      ),
    );
  };

  const onTitleChange = (todoId: number, todoTitle: string)=> {
    setTodos(prevTodos =>
      prevTodos.map(todo => todo.id === todoId ? { ...todo, title: todoTitle } : todo))
  }

  const value = {
    todos,
    setTodos,
    addTodo,
    todoValue,
    setTodoValue,
    clearCompleted,
    deleteTodo,
    handleSelectAll,
    allChecked,
    handleChange,
    onTitleChange
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
