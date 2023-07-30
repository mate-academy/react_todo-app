import React, { useCallback, useMemo, useState } from 'react';
import { Todo } from '../models/Todo';
// eslint-disable-next-line import/no-cycle
import {
  getTodosByStatus,
  getTodosStats,
  TodosStats,
} from '../services/todo.service';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodoContextState {
  todos: Todo[],
  addTodo: (title: string) => void,
  toggleCompletedTodo: (todoId: number) => void,
  removeTodo: (todoId: number) => void,
  statusTodoList: StatusTodoList,
  changeStatusTodoList: (status: StatusTodoList) => void,
  todosStats: TodosStats,
  clearTodos: () => void,
  toggleAllTodos: () => void,
  handleEdit: (newTodo:Todo) => void,
}

export const TodoContext = React.createContext<TodoContextState>(
  {} as TodoContextState,
);

export enum StatusTodoList {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type TodoProviderProps = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>([], 'todos');
  const [statusTodoList, setStatusTodoList]
    = useState<StatusTodoList>(StatusTodoList.All);

  const visibleTodos = useMemo(() => {
    return getTodosByStatus(todos, statusTodoList);
  }, [todos, statusTodoList]);

  const addTodo = useCallback((title: string) => {
    setTodos(
      currentTodos => [...currentTodos, {
        id: Date.now(),
        title,
        completed: false,
      }],
    );
  }, []);

  const toggleCompletedTodo = useCallback((todoId: number) => {
    setTodos(
      currentTodos => currentTodos.map(
        todo => (todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo),
      ),
    );
  }, []);

  const removeTodo = useCallback((todoId: number) => {
    setTodos(
      currentTodos => currentTodos.filter(
        todo => todo.id !== todoId,
      ),
    );
  }, []);

  const changeStatusTodoList = useCallback((status: StatusTodoList) => {
    if (status === statusTodoList) {
      return;
    }

    setStatusTodoList(status);
  }, [statusTodoList]);

  const todosStats = useMemo(() => {
    return getTodosStats(todos);
  }, [todos]);

  const clearTodos = useCallback(() => {
    setTodos(currentTodos => currentTodos.filter(
      todo => !todo.completed,
    ));
  }, []);

  const toggleAllTodos = useCallback(() => {
    const areAllCompleted = todos.every(
      todo => todo.completed,
    );

    if (areAllCompleted) {
      setTodos(currentTodos => currentTodos.map(
        todo => ({ ...todo, completed: false }),
      ));
    } else {
      setTodos(currentTodos => currentTodos.map(
        todo => ({ ...todo, completed: true }),
      ));
    }
  }, [todos]);

  const handleEdit = useCallback((newTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(
      todo => (todo.id === newTodo.id
        ? newTodo
        : todo),
    ));
  }, []);

  return (
    <TodoContext.Provider value={{
      todos: visibleTodos,
      addTodo,
      toggleCompletedTodo,
      removeTodo,
      changeStatusTodoList,
      statusTodoList,
      todosStats,
      clearTodos,
      toggleAllTodos,
      handleEdit,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};
