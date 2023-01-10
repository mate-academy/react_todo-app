import React, {
  useCallback,
  useContext, useEffect, useMemo, useState, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './components/Auth/AuthContext';
import {
  getTodos, createTodo, updateTodo, deleteTodo,
} from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { ErrorType } from './types/ErrorType';
import { Loading } from './types/Loading';
import { Renaming } from './types/Renaming';
import { Filter } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [error, setError] = useState<ErrorType>(ErrorType.Clear);
  const [isAdding, setIsAdding] = useState(false);
  const [toggleAll, setToggleAll] = useState(false);
  const [isLoading, setIsLoading] = useState<Loading>({});
  const [isRenaming, setIsRenaming] = useState<Renaming>({});
  const timerId = useRef(0);
  const location = useLocation().pathname;

  const user = useContext(AuthContext);

  const getTodosFromServer = async () => {
    if (!user) {
      return;
    }

    try {
      const result = await getTodos(user.id);

      setTodos(result);
    } catch (err: unknown) {
      throw new Error('Networ Error');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    setToggleAll(todos.every(({ completed }) => completed === true));
  }, [todos]);

  const showError = (err: ErrorType) => {
    clearTimeout(timerId.current);
    setError(err);
    timerId.current = window.setTimeout(() => setError(ErrorType.Clear), 3000);
  };

  const filteredByCompleted = useCallback(
    (
      isCompleted: boolean,
      arrTodos = todos,
    ): Todo[] => (
      arrTodos.filter(todo => todo.completed === isCompleted)
    ), [todos],
  );

  const getIsLoading = (arrTodos: Todo[], loading: boolean) => {
    const isLoadingObj: Loading = arrTodos.reduce((obj, { id }) => ({
      ...obj,
      [id]: loading,
    }), {});

    setIsLoading(isLoadingObj);
  };

  const itemsLeft = filteredByCompleted(false).length;

  const completedTodos = useMemo(() => (
    filteredByCompleted(true)),
  [todos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    if (!todoTitle) {
      showError(ErrorType.Eempty);

      return;
    }

    try {
      setIsAdding(true);
      setTempTodo(true);

      const todo = await createTodo(user.id, todoTitle);

      setTodos(currTodos => [...currTodos, todo]);

      setTodoTitle('');
    } catch (err: unknown) {
      showError(ErrorType.Add);
    } finally {
      setTempTodo(false);
      setIsAdding(false);
    }
  };

  const handleRenamingSubmit = async (
    e: React.FormEvent,
    id: number,
    prevTitle: string,
    title: string,
  ) => {
    e.preventDefault();

    if (prevTitle === title) {
      setIsRenaming({} as Renaming);

      return;
    }

    setIsLoading({ [id]: true });

    try {
      if (title === '') {
        await deleteTodo(id);

        setTodos(currTodos => currTodos.filter(todo => todo.id !== id));
      } else {
        await updateTodo(id, { title });

        setTodos(currTodos => currTodos.map(item => (item.id === id
          ? ({ ...item, title })
          : item)));
      }
    } catch (err: unknown) {
      if (title === '') {
        showError(ErrorType.Delete);
      } else {
        showError(ErrorType.Update);
      }
    } finally {
      setIsRenaming({} as Renaming);
      setIsLoading({} as Loading);
    }
  };

  const handleMarkChange = async (id: number, completed: boolean) => {
    setIsLoading({ [id]: true });

    try {
      await updateTodo(id, { completed: !completed });

      setTodos(currTodos => currTodos.map(item => (item.id === id
        ? ({ ...item, completed: !item.completed })
        : item)));
    } catch (err: unknown) {
      showError(ErrorType.Update);
    } finally {
      setIsLoading({} as Loading);
    }
  };

  const handleDeleteTodoClick = async (id: number) => {
    setIsLoading({ [id]: true });

    try {
      await deleteTodo(id);

      setTodos(currTodos => currTodos.filter(todo => todo.id !== id));
    } catch (err: unknown) {
      showError(ErrorType.Delete);
    } finally {
      setIsLoading({ [id]: false });
    }
  };

  const handleClearCompletedClick = async () => {
    const arrPromises = completedTodos.map(todo => deleteTodo(todo.id));

    getIsLoading(completedTodos, true);

    try {
      await Promise.all(arrPromises);

      setTodos(currTodos => filteredByCompleted(false, currTodos));
    } catch (err:unknown) {
      showError(ErrorType.Delete);
    } finally {
      getIsLoading(completedTodos, false);
    }
  };

  const handleToggleAll = async () => {
    const activeTodos = filteredByCompleted(toggleAll);
    const arrPromises = activeTodos.map(({ id, completed }) => (
      updateTodo(id, { completed: !completed })));

    getIsLoading(activeTodos, true);

    try {
      await Promise.all(arrPromises);

      setTodos(currTodos => currTodos.map(item => (
        { ...item, completed: !toggleAll })));

      setToggleAll(prev => !prev);
    } catch (err: unknown) {
      showError(ErrorType.Update);
    } finally {
      getIsLoading(activeTodos, false);
    }
  };

  const getFilterTodos = useCallback(
    () => {
      switch (location) {
        case Filter.Active:
          return filteredByCompleted(false);

        case Filter.Completed:
          return filteredByCompleted(true);

        default:
          return todos;
      }
    }, [location, todos],
  );

  const visibleTodos = useMemo(
    getFilterTodos,
    [todos, location],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleSubmit={handleSubmit}
          handleTitleChange={setTodoTitle}
          todoTitle={todoTitle}
          isAdding={isAdding}
          handleToggleAll={handleToggleAll}
          toggleAll={toggleAll}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
              tempTodo={tempTodo}
              todoTitle={todoTitle}
              isLoading={isLoading}
              isRenaming={isRenaming}
              handleMarkChange={handleMarkChange}
              handleDeleteTodoClick={handleDeleteTodoClick}
              setIsRenaming={setIsRenaming}
              handleRenamingSubmit={handleRenamingSubmit}
            />

            <Footer
              itemsLeft={itemsLeft}
              completedTodos={completedTodos.length}
              handleClearCompletedClick={handleClearCompletedClick}
            />
          </>
        )}
      </div>

      <ErrorMessage
        error={error}
        setError={setError}
      />
    </div>
  );
};
