import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { counterOfActiveTodos, filterTodos } from '../helpers/helpers';
import {
  addTodo, deleteTodo, getTodos, patchTodo,
} from '../api/todos';
import { Loader } from '../Loader';
import { ErrorType } from '../types/ErrorType';
import { Header } from '../components/Header/Header';
import { TodoList } from '../components/TodoList/TodoList';
import { Footer } from '../components/Footer/Footer';
import { Error } from '../components/Error/Error';
import { useLocalStorage } from '../utils/useLocalStorage';

const USER_ID = 6755;

export const TodoPage:FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.None);
  const [title, setTitle] = useState('');
  const [tempTodo, setTempTodo] = useState<null | Todo>(null);
  const [loadingTodo, setLoadingTodo] = useState([0]);
  const [isSending, setIsSending] = useState(false);
  const [
    countActiveTodo,
    setCountActiveTodo,
  ] = useState(counterOfActiveTodos(todos));
  const [isToggleAll, setIsToggleAll] = useState(false);
  const [isOnRender, setIsOnRender] = useState(false);
  const [storageTodos, setStorageTodos] = useLocalStorage<Todo[]>('todos', []);
  const { pathname } = useLocation();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const fetchTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setHasError(true);
      setErrorType(ErrorType.Load);
    }
  };

  const addNewTodo = useCallback((newTodo: Todo): void => {
    setTodos((oldTodos) => [...oldTodos, newTodo]);
  }, []);

  const showError = useCallback((error: ErrorType) => {
    setErrorType(error);
    setHasError(true);
  }, []);

  const hideError = useCallback(() => {
    setHasError(false);
  }, []);

  const removeTodo = async (todoId: number) => {
    try {
      setLoadingTodo(prevTodo => [...prevTodo, todoId]);

      await deleteTodo(todoId);
      setTodos(todoForDelete => (
        todoForDelete.filter(todo => todo.id !== todoId)
      ));
    } catch {
      setHasError(true);
      showError(ErrorType.Delete);
    } finally {
      setLoadingTodo([0]);
    }
  };

  const addNewTodoInList = async (newTodo:Todo) => {
    if (!isSending) {
      try {
        const downloadNewTodo = await addTodo(USER_ID, newTodo);

        addNewTodo(downloadNewTodo);
      } catch {
        showError(ErrorType.Add);
      } finally {
        setTitle('');
        setTempTodo(null);
        setIsSending(false);
      }
    }
  };

  const handleFormSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      showError(ErrorType.EmptyTitle);
      setTitle('');

      return;
    }

    const newTodo = {
      userId: USER_ID,
      id: 0,
      title,
      completed: false,
    };

    setTempTodo({ ...newTodo });
    setIsSending(true);

    addNewTodoInList(newTodo);
  };

  const updateTodo = async (
    todoId: number,
    completed?: boolean,
    newTitle?: string,
  ) => {
    setLoadingTodo([todoId]);

    try {
      await patchTodo(todoId, completed, newTitle);
      fetchTodos();
    } catch (error) {
      showError(ErrorType.Update);
      setHasError(true);
      setIsOnRender(true);
    } finally {
      setLoadingTodo([0]);
      setIsToggleAll(false);
      setIsOnRender(false);
    }
  };

  const toggleCompletedAllTodo = () => {
    todos.forEach(todo => {
      if (counterOfActiveTodos(todos) > 0) {
        return todo.completed ? todo : updateTodo(todo.id, !todo.completed);
      }

      return updateTodo(todo.id, !todo.completed);
    });

    return setIsToggleAll(true);
  };

  useMemo(() => {
    setCountActiveTodo(counterOfActiveTodos(todos));
  }, [todos]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setStorageTodos(todos);
  }, [todos]);

  if (!USER_ID) {
    return (
      <h1>User Not Found</h1>
    )
  }

  return (
    <Loader.Provider value={loadingTodo}>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          setTitle={handleTextChange}
          handleFormSubmit={handleFormSubmit}
          toggleCompletedAllTodo={toggleCompletedAllTodo}
          countActiveTodo={countActiveTodo}
          hasTodos={!!todos.length}
        />

        {(todos.length > 0) && (
          <>
            <TodoList
              todos={filterTodos(storageTodos, pathname)}
              removeTodo={removeTodo}
              tempTodo={tempTodo}
              isToggleAll={isToggleAll}
              handleUpdateTodoFormSubmit={updateTodo}
              isOnRender={isOnRender}
            />
            <Footer
              todos={todos}
              removeTodo={removeTodo}
            />
          </>
        )}
      </div>

      {hasError && (
        <Error
          errorType={errorType}
          hasError={hasError}
          onNotificationClose={hideError}
        />
      )}
    </Loader.Provider>
  );
};
