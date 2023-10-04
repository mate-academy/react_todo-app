import React, { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';

interface TodosContextValue {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  getTodoById: (todoId: number) => Todo | null;
  handleCheckboxClick: (todoId: number) => void;
  handleDelete: (todoId: number) => void;
  handleTitleEditing: (
    setTodoTitle: (newTitle: string) => void, newTitle: string) => void;
  handleKeyDown: (
    todoId: number,
    PressedKey: string,
    todoTitle: string,
    setTodoTitle: (newTitle: string) => void,
    setEditing: (edit: boolean) => void,
  ) => void;
  handleBlur: (
    todoId: number,
    editing: boolean,
    todoTitle: string,
    setTodoTitle: (newTitle: string) => void,
    setEditing: (edit: boolean) => void,
  ) => void;
}

export const TodosContext = React.createContext<TodosContextValue>({
  todos: [],
  setTodos: () => { },
  getTodoById: () => null,
  handleCheckboxClick: () => { },
  handleDelete: () => { },
  handleTitleEditing: () => { },
  handleKeyDown: () => { },
  handleBlur: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  function getTodoById(todoId: number): Todo | null {
    return todos.find((item: Todo) => item.id === todoId) || null;
  }

  const handleCheckboxClick = (todoId: number) => {
    setTodos(todos.map(item => {
      if (item.id === todoId) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    }));
  };

  const handleDelete = (todoId: number) => {
    const todoToUpdate = getTodoById(todoId);

    if (todoToUpdate) {
      setTodos(todos.filter(obj => obj !== todoToUpdate));
    }
  };

  const handleTitleEditing = (
    setTodoTitle: (newTitle: string) => void, newTitle: string,
  ) => {
    setTodoTitle(newTitle);
  };

  const handleTitleSubmit = (
    todoId: number,
    PressedKey: string,
    todoTitle: string,
    setTodoTitle: (newTitle: string) => void,
    setEditing: (edit: boolean) => void,
  ) => {
    const todoToUpdate = getTodoById(todoId);

    if (!todoToUpdate) {
      return;
    }

    if (!todoTitle && PressedKey === 'Enter') {
      handleDelete(todoId);
    }

    if (PressedKey === 'Enter') {
      todoToUpdate.title = todoTitle;
    }

    if (PressedKey === 'Escape') {
      setTodoTitle(todoToUpdate.title);
    }

    setEditing(false);
  };

  const handleKeyDown = (
    todoId: number,
    PressedKey: string,
    todoTitle: string,
    setTodoTitle: (newTitle: string) => void,
    setEditing: (edit: boolean) => void,
  ) => {
    if (PressedKey === 'Enter' || PressedKey === 'Escape') {
      handleTitleSubmit(
        todoId,
        PressedKey,
        todoTitle,
        setTodoTitle,
        setEditing,
      );
    }
  };

  const handleBlur = (
    todoId: number,
    editing: boolean,
    todoTitle: string,
    setTodoTitle: (newTitle: string) => void,
    setEditing: (edit: boolean) => void,
  ) => {
    if (editing) {
      handleTitleSubmit(
        todoId,
        'Enter',
        todoTitle,
        setTodoTitle,
        setEditing,
      );
    }
  };

  const value: TodosContextValue = useMemo(() => ({
    todos,
    setTodos,
    getTodoById,
    handleCheckboxClick,
    handleDelete,
    handleTitleEditing,
    handleKeyDown,
    handleBlur,
  }), [todos, setTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
