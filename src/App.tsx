import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { deleteTodo, getTodos, patchTodo } from './api/todos';
import { Todo } from './types/Todo';
import { USER_ID } from './constants';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorType } from './types/Error';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import { User } from './types/User';
import { getUser } from './api/user';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<ErrorType>(ErrorType.NONE);
  const [processingTodoIds, setProcessingTodoIds] = useState<number[]>([]);
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') as Filter || '';

  const filterTodos = useCallback(() => {
    switch (status) {
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);
      case Filter.ALL:
      default:
        return [...todos];
    }
  }, [status, todos]);

  const filteredTodos = useMemo(() => filterTodos(),
    [status, todos, filterTodos]);

  const removeTodo = useCallback(async (todoId: number) => {
    try {
      setProcessingTodoIds(prevState => [...prevState, todoId]);
      await deleteTodo(todoId);
      setTodos(prevState => prevState.filter(item => item.id !== todoId));
    } catch {
      setError(ErrorType.DELETE);
    } finally {
      setProcessingTodoIds(
        prevState => prevState.filter(item => item !== todoId),
      );
    }
  }, []);

  const updateTodo = useCallback(async (
    todoId: number, updatedData: Partial<Todo>,
  ) => {
    try {
      setProcessingTodoIds(prevState => [...prevState, todoId]);
      await patchTodo(todoId, updatedData);
      setTodos(prevState => prevState.map(
        prevTodo => {
          if (prevTodo.id !== todoId) {
            return prevTodo;
          }

          return { ...prevTodo, ...updatedData };
        },
      ));
    } catch {
      setError(ErrorType.UPDATE);
    } finally {
      setProcessingTodoIds(
        prevState => prevState.filter(item => item !== todoId),
      );
    }
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos(USER_ID);

        setTodos(loadedTodos);
      } catch {
        setError(ErrorType.LOAD);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const loadedUser = await getUser(USER_ID);

        setUser(loadedUser);
      } catch {
        setError(ErrorType.USER);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      { user && (
        <div className="todoapp__content">
          <Header
            setError={setError}
            setTempTodo={setTempTodo}
            setTodos={setTodos}
            setProcessingTodoIds={setProcessingTodoIds}
          />

          <TodoList
            todos={todos}
            filteredTodos={filteredTodos}
            tempTodo={tempTodo}
            error={error}
            processingTodoIds={processingTodoIds}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />

          {!!todos.length && (
            <Footer
              todos={todos}
              status={status}
              removeTodo={removeTodo}
            />
          )}
        </div>
      )}

      <ErrorMessage error={error} setError={setError} />
    </div>
  );
};
