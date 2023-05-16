/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useEffect, useMemo, useCallback, FormEvent, FocusEvent,
} from 'react';

import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Notification } from './components/Notification';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoStatus } from './types/TodoStatus';
import { TodoErrors } from './types/TodoErrors';
import { UserErrors } from './types/UserError';
import {
  getTodos, USER_ID, createTodo, deleteTodo, toggleTodo, changeTitle,
} from './api/todos';
import { getUser } from './api/user';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<TodoErrors | null | UserErrors>(null);
  const [user, setUser] = useState<User | null>(null);

  const [title, setTitle] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');

  const [isProcessed, setIsProcessed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedId, setSeletedId] = useState<number | null>(null);
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);

  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';

  const resetTodoData = (): void => {
    setIsProcessed(false);
    setNewTitle('');
    setEditedTodoId(null);
    setSeletedId(null);
    setTitle('');
  };

  const deleteTodoHandler = useCallback(async (
    todoId: number,
  ) => {
    setSeletedId(todoId);

    try {
      await deleteTodo(todoId);
      setTodos(filtredTodos => filtredTodos
        .filter(todo => todo.id !== todoId));
    } catch (innerError) {
      setError(TodoErrors.Delete);
    } finally {
      setSeletedId(null);
    }
  }, []);

  const createTodoHandler = useCallback(async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      setError(TodoErrors.Empty);
    } else {
      setTempTodo({
        id: 0,
        title,
        completed: false,
        userId: USER_ID,
      });

      try {
        const todo = await createTodo(USER_ID, title);

        setIsProcessed(true);

        if (todo) {
          setTempTodo(null);
          setTodos([...todos, todo]);
        }
      } catch (innerError) {
        setError(TodoErrors.Add);
      } finally {
        resetTodoData();
      }
    }
  }, [title]);

  const toggleTodoHandler = async (todoId: number, check: boolean) => {
    setSeletedId(todoId);

    try {
      await toggleTodo(todoId, !check);
      setTodos(todos.map(todo => (todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
      )));
    } catch (innerError) {
      setError(TodoErrors.Update);
    } finally {
      setSeletedId(null);
    }
  };

  const toggleAllTodoHandler = async () => {
    const allCompleted = todos.every(todo => todo.completed);
    const completed = !allCompleted;

    setIsProcessed(true);

    try {
      await Promise.all(
        todos.filter(todo => todo.completed !== completed)
          .map(async todo => toggleTodo(todo.id, completed)),
      );
      setTodos(todos.map(todo => ({ ...todo, completed })));
    } catch (innerError) {
      setError(TodoErrors.Update);
    } finally {
      setIsProcessed(false);
    }
  };

  const clearCompletedTodos = async () => {
    const completeTodos = todos.filter(todo => todo.completed);

    try {
      await Promise.all(completeTodos.map(async todo => {
        await deleteTodo(todo.id);
      }));
      setTodos(filtredTodos => filtredTodos
        .filter(filtrTodo => !filtrTodo.completed));
    } catch (innerError) {
      setError(TodoErrors.Delete);
    }
  };

  const changeTodoTitleHandler = async (
    event: FormEvent<HTMLFormElement> | FocusEvent<HTMLInputElement>,
  ) => {
    if (!editedTodoId) {
      return;
    }

    event.preventDefault();
    setSeletedId(editedTodoId);

    try {
      if (!newTitle.trim()) {
        await deleteTodo(editedTodoId);
        setTodos(filtredTodos => filtredTodos
          .filter(todo => todo.id !== editedTodoId));
      } else {
        await changeTitle(editedTodoId, newTitle);
        setTodos(innerTodos => innerTodos.map(todo => (todo.id === editedTodoId
          ? { ...todo, title: newTitle }
          : todo)));
      }

      resetTodoData();
    } catch (innerError) {
      setError(TodoErrors.Update);
    } finally {
      setSeletedId(null);
    }
  };

  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const itemsCompleted = todos.filter(todo => todo.completed).length;

  useEffect(() => {
    let timeout: number;

    if (error) {
      timeout = window.setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const filtredTodos = useMemo(() => {
    switch (status) {
      case TodoStatus.All:
        return todos;
      case TodoStatus.Active:
        return todos.filter((todo) => !todo.completed);
      case TodoStatus.Completed:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, status]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos(USER_ID);

        setTodos(fetchedTodos);
      } catch (innerError) {
        setError(TodoErrors.Get);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const fetchUser = async () => {
      try {
        const innerUser = await getUser(USER_ID);

        setUser(innerUser);
      } catch (innerError) {
        setError(UserErrors.Get);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      {isLoading
        ? <Loader />
        : (
          <>
            <h1 className="todoapp__title">{`${user?.name}'s todos`}</h1>

            <div className={
              classNames('todoapp__content', { 'is-show': !isLoading })
            }
            >
              <TodoHeader
                isAnyTodo={todos.length > 0}
                activeTodos={itemsLeft}
                title={title}
                isProcessed={isProcessed}
                onAddTodo={createTodoHandler}
                onToggleAll={toggleAllTodoHandler}
                onAddTitle={setTitle}
              />

              <TodoList
                todos={filtredTodos}
                creating={tempTodo}
                selectedId={selectedId}
                editedTodoId={editedTodoId}
                newTitle={newTitle}
                onDelete={deleteTodoHandler}
                onToggle={toggleTodoHandler}
                onEditedTodoId={setEditedTodoId}
                onAddNewTitle={setNewTitle}
                onChangeTodoTitle={changeTodoTitleHandler}

              />

              {todos.length !== 0
                && (
                  <TodoFilter
                    status={status}
                    itemsLeft={itemsLeft}
                    itemsCompleted={itemsCompleted}
                    clearCompletedTodos={clearCompletedTodos}
                  />
                )}
            </div>
          </>
        )}

      <Notification
        error={error}
        onClose={setError}
      />
    </div>
  );
};
