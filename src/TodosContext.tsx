import React, { useState } from 'react';

export type Todo = {
  title: string,
  id: number,
  completed: boolean,
};

type Props = {
  children: React.ReactNode,
};

export const todos: Todo[] = [];

interface Context {
  newTodos: Todo[],
  newTodo: Todo,
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleOnSubmit: (event: React.FormEvent) => void,
  handleCompletedChange: (id: number) => void,
  handleTodoDelete: (id: number) => void,
  handleAllCompletedChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  allCompleted: boolean,
  activeTodos: Todo[],
  handleClearCompleted: () => void,
  completedTodos: Todo[],
}

export const TodosContext = React.createContext<Context>({
  newTodos: [],
  newTodo: {
    title: '',
    id: 0,
    completed: false,
  },
  handleTitleChange: () => { },
  handleOnSubmit: () => { },
  handleCompletedChange: () => { },
  handleTodoDelete: () => { },
  handleAllCompletedChange: () => {},
  allCompleted: false,
  activeTodos: [],
  handleClearCompleted: () => {},
  completedTodos: [],
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [newTodo, setNewTodo] = useState<Todo>({
    title: '',
    id: 0,
    completed: false,
  });

  const [allCompleted, setAllCompleted] = useState(false);

  const [newTodos, setNewTodos] = useState(todos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: event.target.value,
    });
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNewTodos([...newTodos, newTodo]);

    setNewTodo({
      ...newTodo,
      title: '',
      id: +new Date(),
    });
  };

  const handleTodoDelete = (id: number) => {
    const filteredTodos = newTodos.filter((todo) => todo.id !== id);

    setNewTodos(filteredTodos);

    const allTodosCompleted = filteredTodos.every((todo) => todo.completed);

    setAllCompleted(filteredTodos.length > 0 && allTodosCompleted);
  };

  const handleCompletedChange = (id: number) => {
    const updatedTodos = newTodos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setNewTodos(updatedTodos);

    const allTodosCompleted = updatedTodos.every((todo) => todo.completed);

    setAllCompleted(allTodosCompleted);
  };

  const handleAllCompletedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllCompleted(event.target.checked);

    const updatedTodos = newTodos.map((todo) => {
      return {
        ...todo,
        completed: event.target.checked,
      };
    });

    setNewTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    const filteredTodos = newTodos.filter(todo => todo.completed === false);

    setNewTodos(filteredTodos);
  };

  const activeTodos = [...newTodos].filter(todo => !todo.completed);

  const completedTodos = [...newTodos].filter(todo => todo.completed);

  return (
    <TodosContext.Provider
      value={{
        newTodos,
        handleTitleChange,
        newTodo,
        handleOnSubmit,
        handleCompletedChange,
        handleTodoDelete,
        handleAllCompletedChange,
        allCompleted,
        activeTodos,
        handleClearCompleted,
        completedTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
