/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList/TodoList';
import { PatchedTodo, Todo } from './types/Todo';
import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
  changeTodos,
} from './api/todos';
import { Errors } from './types/Errors';
import { FilterType } from './types/FilterType';
import {
  LoadingContext,
  LoadingProvider,
} from './components/LoadingContext/LoadingContext';

const USER_ID = 10209;

const getFilteredTodos = (todos: Todo[], filterType: string) => {
  switch (filterType) {
    case FilterType.ALL:
      return todos;

    case FilterType.ACTIVE:
      return todos.filter((todo) => !todo.completed);

    case FilterType.COMPLETED:
      return todos.filter((todo) => todo.completed);

    default:
      return [];
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors>(Errors.NONE);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [title, setTitle] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    getTodos(USER_ID)
      .then((response) => {
        setTodos(response);
        setIsLoading(false);
      })
      .catch(() => {
        setError(Errors.UPLOAD);
        setIsLoading(false);
      });
  }, []);

  if (!USER_ID) {
    setError(Errors.NOUSER);
  }

  const visibleTodos = getFilteredTodos(todos, filterType);
  const completedTodos = getFilteredTodos(todos, FilterType.COMPLETED);
  const isToggleOnActive = todos.length === completedTodos.length;

  const handleError = (e: Errors) => {
    setError(e);
    setTimeout(() => {
      setError(Errors.NONE);
    }, 3000);
  };

  const handleAddTodo = async (value: string) => {
    if (!value) {
      setError(Errors.EMPTY);
      setTimeout(() => {
        setError(Errors.NONE);
      }, 3000);

      return;
    }

    const newTodo = {
      id: 0,
      userId: USER_ID,
      title,
      completed: false,
    };

    setTempTodo(newTodo);

    const postedTodo = await postTodo(USER_ID, newTodo);

    setTodos((prev: Todo[]) => {
      return [...prev, postedTodo];
    });
    setTempTodo(null);
    setTitle('');
  };

  const handleDeleteTodo = async (todoId: number) => {
    setIsLoading(true);
    await deleteTodo(USER_ID, todoId);
    try {
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch {
      setError(Errors.DELETE);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCompleted = async () => {
    setIsLoading(true);
    const completedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    try {
      await Promise.all(completedTodoIds.map(id => deleteTodo(USER_ID, id)));
      setTodos(todos.filter(todo => !todo.completed));
    } catch {
      setError(Errors.DELETE);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (id: number, data: PatchedTodo) => {
    try {
      const updatedTodo = await updateTodo(id, data);

      setTodos((prevTodos) => {
        const index = prevTodos.findIndex((todo) => todo.id === id);

        if (index === -1) {
          return prevTodos;
        }

        const updatedTodos = [...prevTodos];

        updatedTodos[index] = updatedTodo;

        return updatedTodos;
      });
    } catch {
      setError(Errors.UPDATE);
    }
  };

  const handleToggleAll = async () => {
    try {
      setIsLoading(true);
      const idsToToggle = todos
        .filter(todo => (todo.completed === isToggleOnActive))
        .map(todo => todo.id);

      const toggledTodos = await Promise.all(
        idsToToggle.map(id => updateTodo(id, { completed: !isToggleOnActive })),
      );

      setTodos(changeTodos(todos, toggledTodos));
    } catch {
      setError(Errors.UPDATE);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingProvider todos={visibleTodos}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header
            todos={visibleTodos}
            hasSomeTodos={!!todos.length}
            onChangeIsError={handleError}
            onSubmitAddTodo={handleAddTodo}
            titleTodo={title}
            onChangeTitle={setTitle}
            onToggleAll={handleToggleAll}
          />
          <TodoList
            tempTodo={tempTodo}
            todos={visibleTodos}
            onChangeIsError={handleError}
            onDelete={handleDeleteTodo}
            onChangeTodo={handleToggle}
          />

          {!!todos.length && (
            <Footer
              todos={visibleTodos}
              filterType={filterType}
              setFilterType={setFilterType}
              handleClearCompleted={handleClearCompleted}
            />
          )}
        </div>

        {error
          && (
            <div
              className={
                classNames(
                  'notification is-danger is-light has-text-weight-normal',
                  { hidden: !error },
                )
              }
            >
              <button
                type="button"
                className="delete"
                onClick={() => setError(Errors.NONE)}
              />
              {error}
            </div>
          )}
      </div>
    </LoadingProvider>
  );
};
