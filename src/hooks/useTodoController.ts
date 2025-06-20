import { useCallback, useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/todo/Todo';
import { StatusFilter } from '../enums/statusFilter';
import { getFilteredTodos } from '../utils/getFilteredTodos';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../utils/localStorage';

const TODOS_KEY = 'todos';

export const useTodoController = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return loadFromLocalStorage<Todo[]>(TODOS_KEY) ?? [];
  });
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.All,
  );

  useEffect(() => {
    saveToLocalStorage<Todo[]>(TODOS_KEY, todos);
  }, [todos]);

  const filteredTodos = getFilteredTodos(todos, statusFilter);

  const isThereAlLeastOneTodo = todos.length > 0;
  const isAllTodosCompleted = todos.every(todo => todo.completed);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const isThereAtLeastOneCompletedTodo = todos.some(todo => todo.completed);

  const onAddTodo = useCallback((todoTitle: string) => {
    const todoToCreate: Todo = {
      id: Date.now(),
      title: todoTitle,
      completed: false,
    };

    setTodos(current => [...current, todoToCreate]);
  }, []);

  const onTodoDelete = useCallback((todoId: number) => {
    setTodos(current => current.filter(todo => todo.id !== todoId));
  }, []);

  const onTodoUpdate = useCallback(
    (
      todoId: number,
      todoDataToUpdate: Partial<Pick<Todo, 'title' | 'completed'>>,
    ) => {
      setTodos(current => {
        return current.map(todo => {
          if (todo.id === todoId) {
            return {
              ...todo,
              ...todoDataToUpdate,
            };
          }

          return todo;
        });
      });
    },
    [],
  );

  const onClearCompletedTodos = useCallback(() => {
    const allCompletedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    allCompletedTodoIds.forEach(completedTodoId => {
      onTodoDelete(completedTodoId);
    });
  }, [todos, onTodoDelete]);

  const onToggleTodos = useCallback(() => {
    const newStatus = !isAllTodosCompleted;

    const todosToUpdate = todos.filter(todo => todo.completed !== newStatus);

    todosToUpdate.forEach(todoToUpdate => {
      onTodoUpdate(todoToUpdate.id, { completed: newStatus });
    });
  }, [isAllTodosCompleted, onTodoUpdate, todos]);

  return useMemo(
    () => ({
      todos,
      isThereAlLeastOneTodo,
      isAllTodosCompleted,
      onAddTodo,
      onTodoDelete,
      onClearCompletedTodos,
      onTodoUpdate,
      onToggleTodos,
      statusFilter,
      setStatusFilter,
      filteredTodos,
      activeTodosCount,
      isThereAtLeastOneCompletedTodo,
    }),
    [
      todos,
      isThereAlLeastOneTodo,
      isAllTodosCompleted,
      onAddTodo,
      onTodoDelete,
      onClearCompletedTodos,
      onTodoUpdate,
      onToggleTodos,
      statusFilter,
      setStatusFilter,
      filteredTodos,
      activeTodosCount,
      isThereAtLeastOneCompletedTodo,
    ],
  );
};
