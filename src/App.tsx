import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { ErrorType } from './types/ErrorType';
import {
  getTodos, createTodo, removeTodo, patchTodo,
} from './api/todos';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

const getVisibleTodos = (todos: Todo[], filterBy: string) => {
  switch (filterBy) {
    case Status.ACTIVE:
      return todos.filter(item => !item.completed);
    case Status.COMPLETED:
      return todos.filter(item => item.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState<ErrorType>(ErrorType.NONE);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadedTodoIds, setLoadedTodoIds] = useState([0]);

  const [userID, setUserID] = useState(0);

  const { pathname: location } = useLocation();

  const completedTodosCount = useMemo(() => (
    todos.filter(todo => todo.completed).length
  ), [todos]);

  const activeTodosCount = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const addTodo = useCallback(async (title: string) => {
    if (!title.trim()) {
      setHasError(ErrorType.EMPTY_TITLE);

      return;
    }

    const newTodo = {
      title,
      completed: false,
      userId: userID,
    };

    try {
      setIsDisabled(true);
      setTempTodo({ id: 0, ...newTodo });

      const todo = await createTodo(newTodo as Todo);

      setTodos(prevState => [...prevState, todo]);
    } catch {
      setHasError(ErrorType.ADD);
    } finally {
      setTempTodo(null);
      setIsDisabled(false);
    }
  }, [todos]);

  const updateTodo = useCallback(async (
    todoId: number,
    updatedDate: Partial<Todo>,
  ) => {
    if (loadedTodoIds.includes(todoId)) {
      return;
    }

    setLoadedTodoIds(prevState => [...prevState, todoId]);
    setIsDisabled(true);

    try {
      const updatedTodo = await patchTodo(todoId, updatedDate);

      setTodos(prevState => prevState.map(todo => (
        todo.id === todoId
          ? updatedTodo
          : todo)));
    } catch {
      setHasError(ErrorType.UPDATE);
    } finally {
      setIsDisabled(false);
      setLoadedTodoIds([0]);
    }
  }, [loadedTodoIds]);

  const deleteTodo = useCallback(async (taskId: number) => {
    setLoadedTodoIds(prevState => [...prevState, taskId]);

    try {
      await removeTodo(taskId);

      setTodos(prevTodos => (
        prevTodos.filter(({ id }) => id !== taskId)
      ));
    } catch {
      setHasError(ErrorType.DELETE);
    } finally {
      setLoadedTodoIds([0]);
    }
  }, []);

  const handleClearCompleted = () => {
    const filteredTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    const promises = completedTodos.map(todo => {
      setLoadedTodoIds(prevState => [...prevState, todo.id]);

      return removeTodo(todo.id);
    });

    Promise.all(promises).then(() => {
      setTodos(filteredTodos);
      setLoadedTodoIds([]);
    });
  };

  const setId = (id: number) => {
    return setUserID(id);
  };

  const activeTodos = getVisibleTodos(todos, Status.ACTIVE);
  const completedTodos = getVisibleTodos(todos, Status.COMPLETED);

  const changeStatusForAll = useCallback(async () => {
    if (!loadedTodoIds.length) {
      return;
    }

    await Promise.all(activeTodos.map(({ id }) => (
      updateTodo(id, { completed: true }))));

    if (!activeTodos.length) {
      await Promise.all(
        completedTodos.map(({ id }) => (
          updateTodo(id, { completed: false }))),
      );
    }
  }, [completedTodos, activeTodos]);

  const onCloseError = () => setHasError(ErrorType.NONE);

  const visibleTodos = getVisibleTodos(todos, location);

  const fetchTodos = async () => {
    try {
      const getData = await getTodos(userID);

      setTodos(getData);
    } catch {
      setHasError(ErrorType.LOAD);
    }
  };

  const takeUserID = () => {
    let id;

    if ('userID' in localStorage
      && localStorage.getItem('userID') !== null) {
      id = Number(localStorage.getItem('userID'));
      setUserID(id);
    }
  };

  useEffect(() => {
    takeUserID();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [userID]);

  if (!userID) {
    return <UserWarning setUserId={setId} />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          addTodo={addTodo}
          isDisabled={isDisabled}
          activeTodosCount={activeTodosCount}
          onToggleAll={changeStatusForAll}
        />

        <Main
          todos={visibleTodos}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          tempTodo={tempTodo}
          loadedTodoIds={loadedTodoIds}
        />

        {todos.length > 0 && (
          <>
            <Footer
              onClearCompleted={handleClearCompleted}
              activeTodosCount={activeTodosCount}
              completedTodosCount={completedTodosCount}
            />
          </>
        )}
      </div>

      {hasError && (
        <ErrorNotification
          errorMessage={hasError}
          onCloseError={onCloseError}
        />
      )}

      {('userID' in localStorage) && (
        <button
          type="button"
          className="button is-primary is-medium"
          onClick={() => {
            localStorage.removeItem('userID');
            setUserID(0);
          }}
        >
          Log Out
          <i className="fa-solid fa-door-open fa-lg ml-2" />
        </button>
      )}
    </div>
  );
};
