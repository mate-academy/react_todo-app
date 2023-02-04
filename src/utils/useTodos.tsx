import { useState, useContext, useCallback } from 'react';
import {
  getTodos, postTodo, deleteTodo, patchTodo,
} from '../api/todos';
import { Errors } from '../types/Errors';
import { AuthContext } from '../components/Auth/AuthContext';
import { Todo } from '../types/Todo';

export const useTodos = () => {
  const user = useContext(AuthContext);
  const [error, setError] = useState(Errors.NONE);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [todoIdsForLoader, setTodoIdsForLoader] = useState<number[]>([]);

  const loadTodos = useCallback(async () => {
    if (user) {
      try {
        setError(Errors.NONE);
        const todos = await getTodos(user.id);

        setTodosFromServer(todos);
      } catch {
        setError(Errors.LOAD);
      }
    }
  }, [user]);

  const createTodo = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (user && newTodoTitle.trim().length) {
        try {
          setIsAdding(true);
          await postTodo(user.id, newTodoTitle);

          await loadTodos();
        } catch {
          setError(Errors.ADD);
        } finally {
          setIsAdding(false);
          setNewTodoTitle('');
        }
      } else {
        setError(Errors.ADD);
      }
    }, [user, newTodoTitle],
  );

  const toggleAllTodos = useCallback(async () => {
    try {
      const activeTodosIds = todosFromServer
        .filter(todo => !todo.completed)
        .map(todo => todo.id);

      if (activeTodosIds.length) {
        setTodoIdsForLoader(activeTodosIds);

        await Promise.all(activeTodosIds
          .map(id => patchTodo(id, { completed: true })));

        await loadTodos();
      } else {
        const todosIds = todosFromServer.map(todo => todo.id);

        setTodoIdsForLoader(todosIds);

        await Promise.all(todosFromServer
          .map(todo => patchTodo(todo.id, { completed: false })));

        await loadTodos();
      }
    } catch {
      setError(Errors.UPDATE);
    } finally {
      setTodoIdsForLoader([]);
    }
  }, [todosFromServer]);

  const clearCompletedTodos = useCallback(async () => {
    try {
      const completedTodosIds = todosFromServer
        .filter(todo => todo.completed)
        .map(todo => todo.id);

      setTodoIdsForLoader(completedTodosIds);

      await Promise.all(completedTodosIds.map(id => deleteTodo(id)));

      await loadTodos();
    } catch {
      setError(Errors.DELETE_COMPLETED);
    } finally {
      setTodoIdsForLoader([]);
    }
  }, [todosFromServer]);

  const removeTodo = useCallback(async (todoId: number) => {
    try {
      setTodoIdsForLoader([todoId]);
      await deleteTodo(todoId);

      await loadTodos();
    } catch {
      setError(Errors.DELETE);
    } finally {
      setTodoIdsForLoader([]);
    }
  }, [todosFromServer]);

  const toggleTodo = useCallback(async (todo: Todo) => {
    try {
      setTodoIdsForLoader([todo.id]);
      await patchTodo(todo.id, { completed: !todo.completed });

      await loadTodos();
    } catch {
      setError(Errors.UPDATE);
    } finally {
      setTodoIdsForLoader([]);
    }
  }, [todosFromServer]);

  const updateTodoTitle = useCallback(async (todoTitle: string, todo: Todo) => {
    try {
      setTodoIdsForLoader([todo.id]);

      await patchTodo(todo.id, { title: todoTitle });

      await loadTodos();
    } catch {
      setError(Errors.UPDATE);
    } finally {
      setTodoIdsForLoader([]);
    }
  }, [todosFromServer]);

  return ({
    error,
    setError,
    todosFromServer,
    newTodoTitle,
    setNewTodoTitle,
    isAdding,
    todoIdsForLoader,
    loadTodos,
    createTodo,
    toggleAllTodos,
    clearCompletedTodos,
    toggleTodo,
    updateTodoTitle,
    removeTodo,
  });
};
