/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList/TodoList';
import { LoadingSpinner } from './components/Loader';
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

const USER_ID = 10209;

const todosFromServer = (todos: Todo[], filterType: string) => {
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
  const [, setIsLoading] = useState(false);
  const [isOnLoad, setIsOnLoad] = useState(false);

  useEffect(() => {
    setIsOnLoad(true);
    getTodos(USER_ID)
      .then((response) => {
        setTodos(response);
        setIsOnLoad(false);
      })
      .catch(() => {
        setError(Errors.UPLOAD);
        setIsOnLoad(false);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todosFromServer(todos, filterType);
  const completedTodos = todosFromServer(todos, FilterType.COMPLETED);
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
    setIsOnLoad(true);
    const completedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    // Promise.all(completedTodoIds.map(id => deleteTodo(USER_ID, id)));
    try {
      await Promise.all(completedTodoIds.map(id => deleteTodo(USER_ID, id)));
      setTodos(todos.filter(todo => !todo.completed));
    } catch {
      setError(Errors.DELETE);
      setIsOnLoad(false);
    } finally {
      setIsOnLoad(false);
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
      setIsOnLoad(true);
      const idsToToggle = todos
        .filter(todo => (todo.completed === isToggleOnActive))
        .map(todo => todo.id);

      const toggledTodos = await Promise.all(
        idsToToggle.map(id => updateTodo(id, { completed: !isToggleOnActive })),
      );

      setTodos(changeTodos(todos, toggledTodos));
    } catch {
      setError(Errors.UPDATE);
      setIsOnLoad(false);
    } finally {
      setIsOnLoad(false);
    }
  };

  return (
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
        {isOnLoad ? (<LoadingSpinner />
        ) : (
          <TodoList
            tempTodo={tempTodo}
            todos={visibleTodos}
            onChangeIsError={handleError}
            onDelete={handleDeleteTodo}
            onChangeTodo={handleToggle}
          />
        )}

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
  );
};
