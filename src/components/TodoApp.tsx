import { useLocation } from 'react-router-dom';
import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
} from '../api/todos';

import { getUser, USER_ID } from '../api/user';
import { User } from '../types/User';
import { ErrorTypes } from '../types/ErrorTypes';
import { Todo } from '../types/Todo';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { Footer } from './Footer';
import { getFilteredTodos } from '../utils/todosFilter';
import { Notifications } from './Notifications';
import { useLocalStorage } from '../utils/useLoacalStorage';

export const TodoApp: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processedTodos, setProcessedTodos] = useState<number[]>([]);
  const [error, setError] = useState<ErrorTypes | null>(null);
  const filterStatus = useLocation().pathname;

  const visibleTodos = useMemo(() => (
    getFilteredTodos(todos, filterStatus)
  ), [todos, filterStatus]);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const isCheckedToggleAll = completedTodos.length === todos.length;

  const getUserName = () => (user ? `by ${user.name}` : '');

  useEffect(() => {
    getUser(USER_ID)
      .then(loadUser => setUser(loadUser))
      .catch(() => setError(ErrorTypes.LOADUSER));
  }, []);

  const getUserTodoList = async () => {
    if (USER_ID) {
      try {
        const loadedTodoList = await getTodos(USER_ID);

        setTodos(loadedTodoList);
      } catch {
        setError(ErrorTypes.LOAD);
      }
    }
  };

  const handleAddTodo = async (newTitle: string) => {
    setIsLoading(true);

    try {
      if (!newTitle.trim()) {
        setError(ErrorTypes.INPUT);
        setIsLoading(false);

        return;
      }

      if (USER_ID) {
        setTempTodo({
          id: 0,
          userId: USER_ID,
          title: newTitle,
          completed: false,
        });

        const newTodo = await postTodo({
          userId: USER_ID,
          title: newTitle,
          completed: false,
        });

        setTodos([...todos, newTodo]);
      }
    } catch {
      setError(ErrorTypes.ADD);
    } finally {
      setIsLoading(false);
      setTempTodo(null);
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    setIsLoading(true);
    try {
      setProcessedTodos(prevTodos => [...prevTodos, todo.id]);
      const updatedTodo = { ...todo, completed: !todo.completed };

      await updateTodo(todo.id, updatedTodo);
      await getUserTodoList();
    } catch {
      setError(ErrorTypes.UPDATE);
    } finally {
      setProcessedTodos([]);
      setIsLoading(false);
    }
  };

  const handleUpdateTitle = async (todo: Todo, newTitle: string) => {
    setIsLoading(true);
    try {
      setProcessedTodos(prevTodos => [...prevTodos, todo.id]);
      const updatedTitle = { ...todo, title: newTitle };
      const updatedTodo = await updateTodo(todo.id, updatedTitle);

      await getUserTodoList();
      setProcessedTodos(prevTodos => prevTodos
        .filter(todoId => todoId !== updatedTodo.id));
    } catch {
      setError(ErrorTypes.UPDATE);
    } finally {
      setProcessedTodos([]);
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    setIsLoading(true);
    try {
      setProcessedTodos(prevTodos => [...prevTodos, todoId]);
      await deleteTodo(todoId);
      await getUserTodoList();
      setProcessedTodos(prevTodos => prevTodos
        .filter(id => id !== todoId));
    } catch {
      setError(ErrorTypes.DELETE);
    } finally {
      setProcessedTodos([]);
      setIsLoading(false);
    }
  };

  const toggleAllTodos = () => {
    const allTogglers = completedTodos.length !== todos.length
      ? activeTodos
      : todos;

    allTogglers.forEach((todo) => {
      handleUpdateTodo({ ...todo, completed: todo.completed });
    });
  };

  useEffect(() => {
    getUserTodoList();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <h2 className="todoapp__userTitle">{getUserName()}</h2>

      <div className="todoapp__content">
        <Header
          userId={USER_ID}
          createdTodo={handleAddTodo}
          isLoading={isLoading}
          todos={todos}
          isCheckedToggleAll={isCheckedToggleAll}
          toggleAllTodos={toggleAllTodos}
        />

        <TodoList
          todos={visibleTodos}
          tempTodo={tempTodo}
          processedTodos={processedTodos}
          onUpdateTodo={handleUpdateTodo}
          onUpdateTitle={handleUpdateTitle}
          onDelete={handleDeleteTodo}
        />

        {!!todos.length && (
          <Footer
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>

      {error && (
        <Notifications
          setError={setError}
          error={error}
        />
      )}
    </div>
  );
};
