import React, { useState, useMemo } from 'react';
import { Todo } from '../type/Todo';
import { Status } from '../Components/Status/Status';
import { TodoContextType } from '../type/TodoContextType';
import { useLocalSrorage } from '../hoocks/useLocalSrorage';

export const TodosContext = React.createContext<TodoContextType>({
  todos: [],
  filter: Status.ALL,
  setFilter: () => {},
  addTodo: () => {},
  clearedDone: () => {},
  todoComplete: () => {},
  completedTodo: () => {},
  editTodo: () => {},
  deleteItem: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalSrorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<string>(Status.ALL);

  const addTodo = (text: string) => {
    const newTodo = {
      id: `${+new Date()}`,
      title: text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const clearedDone = () => {
    const howDone = todos.filter(todo => todo.completed === true).length;

    if (howDone > 0) {
      setTodos(todos.filter(todo => todo.completed !== true));
    }
  };

  const todoComplete = () => {
    const howLeft = todos.filter(todo => todo.completed === false).length;

    setTodos(todos.map((todo) => {
      if (howLeft === 0) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      if (!todo.completed) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const completedTodo = (todoId: string) => {
    setTodos(todos.map((someTodo) => {
      if (someTodo.id === todoId) {
        return {
          ...someTodo,
          completed: !someTodo.completed,
        };
      }

      return someTodo;
    }));
  };

  const editTodo = (newTitle: string, todoId: string) => {
    setTodos(todos.map((someTodo) => {
      if (someTodo.id === todoId) {
        return {
          ...someTodo,
          title: newTitle,
        };
      }

      return someTodo;
    }));
  };

  const deleteItem = (todoId: string) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const value = useMemo(() => ({
    todos,
    filter,
    setFilter,
    addTodo,
    clearedDone,
    todoComplete,
    completedTodo,
    editTodo,
    deleteItem,
  }), [todos, filter]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
