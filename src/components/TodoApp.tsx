import React, {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { TodoList } from './TodoList';
import { Notification } from './Notification';
import { TodosFilter } from './TodosFilter';
import { getVisibleTodos } from '../helper/getVisibleTodos';
import { useLocalStorage } from '../helper/useLocalStorage';
import { Todo } from '../types/Todo';
import {
  addTodoOnServer, completeTodo, deleteTodo, getTodos, getUser,
  renameTodo,
} from '../api/api';
import { GlobalContext } from '../helper/GlobalContext';
import { ErrorNotice } from '../types/ErrorNotice';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [title, setTitle] = useState('');
  const [userID, setUserID] = useState<string>('');
  const [hasForm, setHasForm] = useState(false);
  const [errorMessage, setMessageError] = useState('');
  const { pathname } = useLocation();
  const { user, setUser, setProcessingIDs } = useContext(GlobalContext);
  const hasError = !!errorMessage;

  const showError = (message: string) => {
    setMessageError(message);
  };

  const loadingTodos = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      const todosServer = await getTodos(+user.id);

      setTodos(todosServer);
    } catch (error) {
      showError(ErrorNotice.LOADING);
    }
  }, [user]);

  useEffect(() => {
    const timeoutForErrorNotice = setTimeout(() => setMessageError(''), 3000);

    return () => {
      clearTimeout(timeoutForErrorNotice);
    };
  }, [errorMessage]);

  useEffect(() => {
    if (user) {
      loadingTodos();
    }
  }, [user]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessingIDs([0]);

    if (!title.trim()) {
      showError(ErrorNotice.TITLE);

      return;
    }

    const createdTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    if (user) {
      addTodo(createdTodo);
      createdTodo.id = 0;
      createdTodo.userId = user.id;

      try {
        await addTodoOnServer(createdTodo);
      } catch (error) {
        showError(ErrorNotice.ADD);
      } finally {
        loadingTodos();
      }

      setTitle('');

      return;
    }

    addTodo(createdTodo);
    setTitle('');
  };

  const handleSubmitUserId = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      const userFromServer = await getUser(userID);

      setUser(userFromServer);
      setUserID('');
      setHasForm(false);
    } catch (error) {
      showError(ErrorNotice.LOADING);
    }
  };

  const handleComplete = useCallback(
    async (todoId: number, status: boolean) => {
      setProcessingIDs([todoId]);

      if (user) {
        try {
          await completeTodo(todoId, !status);
          loadingTodos();
          setProcessingIDs([]);
        } catch (error) {
          showError(ErrorNotice.UPDATE);
        }

        return;
      }

      setTodos((todos.map((todo: Todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return { ...todo, completed: !todo.completed };
      })));

      setProcessingIDs([]);
    }, [setTodos],
  );

  const handleCompleteAll = useCallback(async () => {
    const status = todos.some((todo: Todo) => !todo.completed);

    if (user) {
      try {
        const toggleAll = todos.map((todo: Todo) => {
          if (todo.completed !== status) {
            setProcessingIDs(state => [...state, todo.id]);

            return completeTodo(todo.id, !todo.completed);
          }

          return todo;
        });

        await Promise.all(toggleAll);
        setProcessingIDs([]);
        loadingTodos();
      } catch (error) {
        showError(ErrorNotice.UPDATE);
      }

      return;
    }

    setTodos((todos.map((todo: Todo) => {
      if (todo.completed !== status) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    })));
  }, [setTodos]);

  const handleDelete = useCallback(async (todoId: number) => {
    if (user) {
      try {
        setProcessingIDs([todoId]);
        await deleteTodo(todoId);

        loadingTodos();
      } catch (error) {
        showError(ErrorNotice.DELETE);
      }

      setProcessingIDs([0]);

      return;
    }

    setTodos(todos.filter((todo: Todo) => todo.id !== todoId));
  }, [setTodos]);

  const handleDeleteAll = async (todoIds: number[]) => {
    if (user) {
      try {
        setProcessingIDs(todoIds);
        const deleteAll = todoIds.map(id => deleteTodo(id));

        await Promise.all(deleteAll);
        loadingTodos();
      } catch (error) {
        showError(ErrorNotice.DELETE);
      }

      setProcessingIDs([]);

      return;
    }

    setTodos(todos.filter(
      (todo: Todo) => !todoIds.includes(todo.id),
    ));
  };

  const handleChangeTitle = useCallback(
    async (todoId: number, newTitle: string) => {
      if (user) {
        try {
          setProcessingIDs([todoId]);

          if (!newTitle.trim()) {
            await deleteTodo(todoId);
            setProcessingIDs([]);
            loadingTodos();

            return;
          }

          await renameTodo(todoId, newTitle);

          setProcessingIDs([]);
          loadingTodos();
        } catch (error) {
          showError(ErrorNotice.UPDATE);
        }

        return;
      }

      if (!newTitle.trim()) {
        handleDelete(todoId);

        return;
      }

      setTodos(todos.map((todo: Todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return { ...todo, title: newTitle };
      }));
    }, [setTodos],
  );

  const getInOrGetOut = () => {
    if (user) {
      setHasForm(false);
      setUser(null);

      return;
    }

    setHasForm(!hasForm);
  };

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, pathname)),
  [todos, pathname]);

  const activeTodos = useMemo(() => (
    todos.filter((todo: Todo) => !todo.completed)),
  [todos]);

  const completedTodos: Todo[] = useMemo(() => (
    todos.filter((todo: Todo) => todo.completed)),
  [todos]);

  return (
    <div className="container">
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              value={title}
              placeholder={user
                ? `Hello ${user.name}, what needs to be done?`
                : 'What needs to be done?'}
              onChange={({ target }) => setTitle(target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              items={visibleTodos}
              handleComplete={handleComplete}
              handleCompleteAll={handleCompleteAll}
              handleDelete={handleDelete}
              handleChangeTitle={handleChangeTitle}
              hasActiveTodos={!activeTodos.length}
            />

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${activeTodos.length} items left`}
              </span>

              <TodosFilter />

              {completedTodos.length > 0 && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={() => handleDeleteAll(
                    completedTodos.map(todo => todo.id),
                  )}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}

        <Link
          to="/login"
          className="item item__sign-up"
        >
          Sign up
        </Link>

        <button
          type="button"
          className="item item__sign-in"
          onClick={getInOrGetOut}
        >
          {user ? 'Sign out' : 'Sign in'}
        </button>

        <div className={classNames(
          'sign-in',
          { 'show-form': !hasForm },
        )}
        >
          <form
            className="sign-in__form"
            onSubmit={handleSubmitUserId}
          >
            <input
              className="sign-in__input"
              placeholder="ENTER USER ID"
              type="number"
              value={userID}
              onChange={({ target }) => setUserID(target.value)}
            />
          </form>
        </div>
      </div>
      {user && <h4>{`Your user ID ${user.id}`}</h4>}

      <Notification
        error={hasError}
        errorNotice={errorMessage}
        closeErrorNotice={setMessageError}
      />
    </div>
  );
};
