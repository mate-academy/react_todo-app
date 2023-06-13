import classNames from 'classnames';
import React, {
  FormEvent, useCallback, useEffect, useState,
} from 'react';
import { Footer } from '../Footer/Footer';
import { TodoList } from '../TodoList/TodoList';
import { Status } from '../../types/Status';
import {
  deleteTodo, getTodos, getUser, postTodo, updateTodo,
} from '../../api/todos';
import { ErrorTypes } from '../../types/ErrorTypes';
import { Notification } from '../Notification/Notification';
import { UserResponce } from '../../types/UserResponce';
import { Todo } from '../../types/Todo';

export const TodoTable: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<Status>(Status.All);
  const [error, setError] = useState<ErrorTypes>(ErrorTypes.NONE);
  const [user, setUser] = useState<UserResponce | null>(null);

  const hasCompleted = todos.some(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const allCompleted = todos.every(todo => todo.completed);
  const countNotCompleted = activeTodos.length;

  const USER_ID = 10278;

  const handleGetUser = async () => {
    setError(ErrorTypes.NONE);

    try {
      const userFromServer = await getUser(USER_ID);

      setUser(userFromServer);
    } catch {
      setError(ErrorTypes.LoadUser);
    } finally {
      setTimeout(() => setError(ErrorTypes.NONE), 3000);
    }
  };

  const handleGetTodos = async () => {
    setError(ErrorTypes.NONE);
    try {
      const listOfTodos = await getTodos(USER_ID);

      setTodos(listOfTodos);
    } catch {
      setError(ErrorTypes.LOAD);
    } finally {
      setTimeout(() => setError(ErrorTypes.NONE), 3000);
    }
  };

  useEffect(() => {
    handleGetUser();
    handleGetTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  const handleAddTodo = useCallback(async (title: string) => {
    setError(ErrorTypes.NONE);

    try {
      if (!title.trim()) {
        setError(ErrorTypes.INPUT);

        return;
      }

      const dataNewTodo = {
        userId: USER_ID,
        title,
        completed: false,
      };

      const newTodo = await postTodo(dataNewTodo);

      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch {
      setError(ErrorTypes.ADD);
    }
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (query !== '') {
      handleAddTodo(query);
    }

    setQuery('');
  };

  const handleDeleteTodo = useCallback(async (todoId: number) => {
    setError(ErrorTypes.NONE);

    try {
      await deleteTodo(todoId);

      setTodos(currentTodos => currentTodos
        .filter(currentTodo => currentTodo.id !== todoId));
    } catch {
      setError(ErrorTypes.DELETE);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleCheckbox = async (id: number, value: boolean) => {
    setError(ErrorTypes.NONE);
    try {
      await updateTodo(id, { completed: !value });

      setTodos(curTodos => curTodos.map(curTodo => {
        if (curTodo.id !== id) {
          return curTodo;
        }

        return {
          ...curTodo,
          completed: !value,
        };
      }));
    } catch {
      setError(ErrorTypes.PATCH);
    }
  };

  const handleChangeTitle = async (id: number, newTitle: string) => {
    setError(ErrorTypes.NONE);

    try {
      await updateTodo(id, { title: newTitle });

      setTodos(curTodos => curTodos.map(curTodo => {
        if (curTodo.id !== id) {
          return curTodo;
        }

        return {
          ...curTodo,
          title: newTitle,
        };
      }));
    } catch {
      setError(ErrorTypes.PATCH);
    }
  };

  const handleToogleAll = () => {
    if (activeTodos.length === 0) {
      completedTodos.forEach(todo => handleCheckbox(todo.id, todo.completed));
    } else {
      activeTodos.forEach(todo => handleCheckbox(todo.id, todo.completed));
    }
  };

  const handleClearCompleted = () => {
    completedTodos.forEach(todo => handleDeleteTodo(todo.id));
  };

  return (
    <>
      <header className="header">
        <h1>{`${user ? `${user.name}'s` : ''} todos`}</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={handleInputChange}
          />
        </form>
      </header>

      <section className="main">
        {todos.length > 0
      && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className={classNames('toggle-all', { 'is-active': allCompleted })}
            data-cy="toggleAll"
            checked={allCompleted}
            onChange={handleToogleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

        <TodoList
          todos={filteredTodos}
          deleteTodo={handleDeleteTodo}
          changeCheckbox={handleCheckbox}
          changeTitle={handleChangeTitle}
        />
      </section>

      {todos.length > 0
    && (
      <Footer
        countNotCompleted={countNotCompleted}
        hasCompleted={hasCompleted}
        filterType={filterType}
        setFilterType={setFilterType}
        handleClearCompleted={handleClearCompleted}
      />
    )}

      {error
        && (
          <Notification error={error} />
        )}
    </>
  );
};
