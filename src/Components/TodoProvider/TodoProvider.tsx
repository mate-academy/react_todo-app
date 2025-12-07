import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Filter } from "../../types/enums/Filter";
import { Todo } from "../../types/Todo";

type Props = {
  children: React.ReactNode;
};

type TodoContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  setTodos: (todos: Todo[]) => void;
  activeLink: Filter;
  setActiveLink: (textLink: Filter) => void;
  addTodo: (title: string) => void;
  deleteTodo: (todoId: number) => void;
  updateTodo: (todo: Todo) => void;
  handleToggleCheckboxes: () => void;
  handleClearCompleted: () => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  filteredTodos: [],
  setTodos: () => {},
  activeLink: Filter.All,
  setActiveLink: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  handleToggleCheckboxes: () => {},
  handleClearCompleted: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeLink, setActiveLink] = useState<Filter>(Filter.All);
  const filteredTodos = useMemo(
    () =>
      todos.filter((t) => {
        if (activeLink === Filter.All) {
          return true;
        }

        if (activeLink === Filter.Active) {
          return !t.completed;
        }

        if (activeLink === Filter.Completed) {
          return t.completed;
        }

        return false;
      }),
    [activeLink, todos],
  );

  useEffect(() => {
    const todosJson = localStorage.getItem("todos");

    if (todosJson) {
      setTodos(JSON.parse(todosJson));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(trimmedTitle: string) {
    const newTodo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    if (newTodo) {
      setTodos((currentTodos) => [...currentTodos, newTodo]);
    }
  }

  function deleteTodo(todoId: number) {
    setTodos((currentTodos) => currentTodos.filter((t) => t.id !== todoId));
  }

  function updateTodo(updatedTodo: Todo) {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo: Todo) =>
        prevTodo.id === updatedTodo.id ? updatedTodo : prevTodo,
      );
    });
  }

  const handleToggleCheckboxes = useCallback(() => {
    const hasActiveTodos = todos.some((todo) => !todo.completed);

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return { ...todo, completed: hasActiveTodos };
      }),
    );
  }, [todos]);

  const handleClearCompleted = useCallback(() => {
    if (todos.some((t: Todo) => t.completed)) {
      setTodos(todos.filter((t: Todo) => !t.completed));
    }
  }, [todos]);

  const value = useMemo(
    () => ({
      todos,
      filteredTodos,
      setTodos,
      activeLink,
      setActiveLink,
      addTodo,
      deleteTodo,
      updateTodo,
      handleClearCompleted,
      handleToggleCheckboxes,
    }),
    [
      activeLink,
      filteredTodos,
      handleClearCompleted,
      handleToggleCheckboxes,
      todos,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
