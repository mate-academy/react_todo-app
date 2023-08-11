import React, { useState, PropsWithChildren, useMemo } from 'react';
import { Todo } from './services/types';
import { Filter } from './services/enums';
import { filterTodos } from './services/utils';
import { useLocalStorage } from './services/utils/hook';
import { ContextProps } from './services/types/types';

const noop = () => {};

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  visibleTodos: [],
  handleOnAdd: noop,
  handleAllCompletedToggle: noop,
  handleClearAllCompleted: noop,
  handleTodoChange: noop,
  handleOnDelete: noop,
  handleToggleTodo: noop,
  isTodosHasCompleted: false,
  isEveryTodoCompleted: false,
  filterBy: Filter.ALL,
  setFilterBy: noop,
  activeTodos: [],
});

export const TodosProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterBy, setFilterBy] = useState(Filter.ALL);

  const visibleTodos = filterTodos(todos, { filterBy });

  const handleOnAdd = (newQuery: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: newQuery.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleAllCompletedToggle
    = (event: React.FormEvent<HTMLInputElement>) => {
      setTodos(todos.map(todo => {
        return {
          ...todo,
          completed: event.currentTarget.checked,
        };
      }));
    };

  const handleClearAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleTodoChange = (newTodo: Todo) => {
    setTodos(todos.map(todo => {
      return todo.id === newTodo.id
        ? newTodo
        : todo;
    }));
  };

  const handleOnDelete = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const handleToggleTodo = (todoId: number) => {
    setTodos(
      todos.map(todo => {
        return todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo;
      }),
    );
  };

  const isTodosHasCompleted = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const isEveryTodoCompleted = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const activeTodos = useMemo(() => {
    return todos.filter(({ completed }) => !completed);
  }, [todos]);

  const value = useMemo(() => ({
    todos,
    visibleTodos,
    handleOnAdd,
    handleAllCompletedToggle,
    handleClearAllCompleted,
    handleTodoChange,
    handleOnDelete,
    handleToggleTodo,
    isTodosHasCompleted,
    isEveryTodoCompleted,
    filterBy,
    setFilterBy,
    activeTodos,
  }), [todos, filterBy]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
