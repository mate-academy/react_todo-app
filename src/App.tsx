import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  getTodos,
  postTodo,
  deleteTodo,
  patchTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './types/Error';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { Filters } from './types/Filters';

const USER_ID = 10586;

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [isUnableToRemove, setUnableToRemove] = useState<boolean>(false);
  const [isUnableToAdd, setUnableToAdd] = useState<boolean>(false);
  const [isSelected, setSelected] = useState<string>(Filters.All);
  const [isEmptyTitle, setEmptyTitle] = useState<boolean>(false);
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [showClearCompleted, setShowClearCompleted] = useState<boolean>(false);
  const [isUnableToUdate, setUnableToUpdate] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<number | boolean>();
  const [todoStatus, setTodoStatus] = useState<boolean>(true);

  const [edit, setEdit] = useState<null | number | undefined>(null);

  const updateTodo = async (userId = 0, completed: boolean,
    title: string) => {
    setShowLoading(userId);

    try {
      await patchTodo(userId, completed, title);

      setTodos(prevTodos => {
        return prevTodos.map(todo => {
          if (todo.id === userId) {
            return {
              ...todo,
              completed,
              title,
            };
          }

          return todo;
        });
      });
    } catch {
      setUnableToUpdate(true);
      setError(Error.Update);
    } finally {
      setShowLoading(false);
    }
  };

  const toggleAll = useCallback(() => {
    setTodoStatus(prev => !prev);
    setShowClearCompleted(show => !show);

    todos.map((todo) => {
      updateTodo(todo.id, todoStatus, todo.title);

      return todos;
    });
  }, [todos, updateTodo]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  });

  const filterTodo = useCallback(() => {
    switch (isSelected) {
      case Filters.All:

        return todos;

      case Filters.Active:
        return todos.filter(todo => !todo.completed);

      case Filters.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [isSelected, todos]);

  const loadTodos = async () => {
    try {
      setError(null);

      const data = await getTodos(USER_ID);

      if ('Error' in data) {
        setError(Error.Load);
      } else {
        setTodos(data);
      }
    } catch {
      setError(Error.Load);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!query.trim()) {
      setEmptyTitle(true);
      setError(Error.Title);

      return;
    }

    const newTodo = {
      title: query,
      completed: false,
      userId: USER_ID,
    };

    setTempTodo({
      ...newTodo,
      id: 0,
    });

    setDisableInput(true);
    try {
      const todo = await postTodo(newTodo);

      setTodos(prevTodo => ([...prevTodo, todo]));
      setQuery('');
    } catch {
      setError(Error.Add);
      setUnableToAdd(true);
    } finally {
      setTempTodo(null);
      setDisableInput(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo();
  };

  const handleChange = (event: React.ChangeEvent<EventTarget>) => {
    setQuery((event.target as HTMLInputElement).value);
  };

  const handleDblClick = (todoId: number | undefined, title: string) => {
    setEdit(todoId);
    setEditValue(title);
  };

  const visibleTodos = filterTodo();

  const revomeTodo = async (todoId = 0) => {
    setShowLoading(todoId);

    try {
      await deleteTodo(todoId);

      setTodos((prevTodo) => prevTodo.filter(prev => prev.id !== todoId));
    } catch {
      setUnableToRemove(true);
      setError(Error.Remove);
    } finally {
      setShowLoading(false);
    }
  };

  const removeCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        revomeTodo(todo.id);
        setShowClearCompleted(false);
      }
    });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          handleChange={handleChange}
          onSumbit={handleSubmit}
          IsDisabled={disableInput}
          toggleAll={toggleAll}
          isTodoStatus={todoStatus}
        />

        {todos?.length > 0 && (
          <>
            <TodoList
              setEdit={setEdit}
              todos={visibleTodos}
              tempTodo={tempTodo}
              onRemove={revomeTodo}
              showLoading={showLoading}
              OnChangeTodo={updateTodo}
              isEdit={edit}
              editValue={editValue}
              handleDblClick={handleDblClick}
              setEditValue={setEditValue}
            />
            <Footer
              selectTodo={setSelected}
              selected={isSelected}
              onRemoveCompleted={removeCompleted}
              isClearCopleted={showClearCompleted}
              todos={todos}
            />
          </>
        )}
        {error && (
          <Notification
            isEmptyTitle={isEmptyTitle}
            setShowError={setError}
            ShowError={error}
            isUnableToAdd={isUnableToAdd}
            isUnableToRemove={isUnableToRemove}
            isUnableToUdate={isUnableToUdate}
          />
        )}
      </div>
    </div>
  );
};
