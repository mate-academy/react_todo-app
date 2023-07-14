/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  deleteTodos,
  getActiveTodos,
  getCompletedTodos,
  getTodos,
  patchTodos,
  postTodos,
} from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './components/Error/Error';
import { TodoList } from './components/TodoList';
import { FilterParams } from './Filter/FilterParams';
import { Filter } from './Filter';
import { TodoContext } from './components/TodoContext';

const USER_ID = 9925;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isGetDataError, setIsGetDataError] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [isInputLocked, setIsLockInput] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [tempTodo, setTempTodo] = useState<string | null>(null);
  const [filterParam, setFilterParam]
  = useState<string | FilterParams>(FilterParams.All);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [isClearAllCompleted, setIsClearAllCompleted] = useState(false);
  const [isToggleAllCompleted, setIsToggleAllCompleted] = useState(false);
  const [isToggleAllActive, setIsToggleAllActive] = useState(false);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      const { completed } = todo;

      switch (filterParam) {
        case FilterParams.Active:
          return !completed;
        case FilterParams.Completed:
          return completed;
        default:
          return true;
      }
    });
  }, [todos, filterParam]);

  const todosGetter = useCallback(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(setIsGetDataError);
  }, []);

  useEffect(() => {
    todosGetter();

    setFilterParam(localStorage.getItem('filter') || FilterParams.All);
  }, []);

  useEffect(() => {
    getActiveTodos(USER_ID)
      .then(setActiveTodos)
      .catch(setIsGetDataError);

    getCompletedTodos(USER_ID)
      .then(setCompletedTodos)
      .catch(setIsGetDataError);
  }, [todos, filterParam]);

  const formInputHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      setInputValue(value);
    }, [],
  );

  const disableErrorHandling = useCallback(() => {
    setIsGetDataError(false);
    setIsPostError(false);
    setIsDeleteError(false);
    setIsInputEmpty(false);
  }, []);

  const postTodoToServer = useCallback((
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const { key } = event.nativeEvent;

    if (key === 'Enter') {
      if (!inputValue.trim()) {
        setIsInputEmpty(true);
      } else {
        setIsLockInput(true);
        setTempTodo(inputValue);

        postTodos(USER_ID, inputValue)
          .then(() => todosGetter())
          .catch(setIsPostError)
          .finally(() => {
            setIsLockInput(false);
            setTempTodo(null);
            setInputValue('');
          });
      }
    }
  }, [inputValue]);

  const deleteAllCompleted = useCallback(async () => {
    try {
      setIsClearAllCompleted(true);

      const arrayOfCompletedTodos
      = await getCompletedTodos(USER_ID);

      const deletePromises
      = arrayOfCompletedTodos.map(todo => deleteTodos(todo.id));

      await Promise.all(deletePromises);
    } finally {
      setIsClearAllCompleted(false);
      todosGetter();
    }
  }, []);

  const toggleAll = () => {
    setIsToggleAllCompleted(false);
    setIsToggleAllActive(false);

    if (completedTodos !== null && completedTodos.length === todos.length) {
      setIsToggleAllCompleted(true);

      Promise.all(
        completedTodos.map(todo => patchTodos(todo.id, { completed: false })),
      )
        .then(() => {
          todosGetter();
        })
        .catch(setIsPostError)
        .finally(() => {
          setIsToggleAllCompleted(false);
        });
    }

    if (activeTodos !== null) {
      setIsToggleAllActive(true);

      Promise.all(
        activeTodos.map(todo => patchTodos(todo.id, { completed: true })),
      )
        .then(() => {
          todosGetter();
        })
        .catch(setIsPostError)
        .finally(() => {
          setIsToggleAllActive(false);
        });
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      setIsLockInput(true);
      setTempTodo(inputValue);

      postTodos(USER_ID, inputValue)
        .then(() => todosGetter())
        .catch(setIsPostError)
        .finally(() => {
          setIsLockInput(false);
          setTempTodo(null);
          setInputValue('');
        });
    }
  };

  const isFooterShown = !!todos.length || tempTodo;
  const isError
  = isGetDataError || isPostError || isDeleteError || isInputEmpty;

  return (
    <TodoContext.Provider value={{
      isClearAllCompleted,
      isToggleAllCompleted,
      isToggleAllActive,
      inputValue,
      getTodos: todosGetter,
      setIsDeleteError,
      setIsPostError,
    }}
    >
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={formInputHandler}
              onKeyDown={postTodoToServer}
              onBlur={handleBlur}
              disabled={isInputLocked}
            />
          </form>
        </header>

        <section className="main">
          {!!todos.length && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                checked={!activeTodos.length}
                onChange={toggleAll}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )}
          <TodoList
            items={visibleTodos}
            tempTodo={tempTodo}
          />
        </section>

        {isFooterShown && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTodos.length} items left`}
            </span>

            <Filter
              setFilterParam={setFilterParam}
              filterParam={filterParam}
            />

            <button
              type="button"
              className="clear-completed"
              disabled={!completedTodos.length}
              onClick={deleteAllCompleted}
            >
              {!!completedTodos.length && 'Clear completed'}
            </button>
          </footer>
        )}
      </div>

      {isError && (
        <Error
          getDataError={isGetDataError}
          postDataError={isPostError}
          deleteDataError={isDeleteError}
          inputState={isInputEmpty}
          disableErrorHandling={disableErrorHandling}
        />
      )}
    </TodoContext.Provider>
  );
};
