import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderForm } from './components/HeaderForm';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import {
  createTodo, deleteTodo, getTodos, updateTodo,
} from './api/todos';
import { getUser } from './api/user';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorType } from './types/ErrorType';
import { Status } from './types/Status';
import { UserResponce } from './types/UserResponse';
import { ToggleAll } from './components/ToggleAll';
import { useLocalStorage } from './utils/useLocalStorage';

const USER_ID = 9942;

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [user, setUser] = useState<UserResponce | null>(null);
  const [errorMessage, setErrorMessage] = useState(ErrorType.None);

  const { filterBy = '' } = useParams();
  const getUserFromServer = async () => {
    try {
      setErrorMessage(ErrorType.None);
      const userFromServer = await getUser(USER_ID);

      setUser(userFromServer);
    } catch (error) {
      setErrorMessage(ErrorType.LoadUser);
    }
  };

  const getTodosFromServer = async () => {
    try {
      setErrorMessage(ErrorType.None);
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorMessage(ErrorType.LoadTodos);
    }
  };

  useEffect(() => {
    getUserFromServer();
    getTodosFromServer();
  }, []);

  const allTodosCount = todos.length;

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const activeTodosCount = activeTodos.length;

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case Status.Active:
        return activeTodos;

      case Status.Completed:
        return completedTodos;

      default:
        return todos;
    }
  }, [filterBy, todos]);

  const createNewTodo = async (title: string) => {
    if (title.trim()) {
      try {
        setErrorMessage(ErrorType.None);
        const newTodo = {
          userId: USER_ID,
          title,
          completed: false,
        };

        const createdTodo = await createTodo(newTodo);

        setTodos([...todos, createdTodo]);
      } catch (error) {
        setErrorMessage(ErrorType.Add);
      }
    }
  };

  const removeTodo = async (id: number) => {
    try {
      setErrorMessage(ErrorType.None);
      await deleteTodo(id);

      setTodos([...todos.filter(todo => todo.id !== id)]);
    } catch (error) {
      setErrorMessage(ErrorType.Delete);
    }
  };

  const removeCompletedTodos = async () => {
    const todosForRemove = completedTodos.map(todo => deleteTodo(todo.id));

    try {
      setErrorMessage(ErrorType.None);
      await Promise.all(todosForRemove);
      setTodos([...activeTodos]);
    } catch (error) {
      setErrorMessage(ErrorType.Delete);
    }
  };

  const handleUpdate = async (id: number, data: boolean | string) => {
    try {
      setErrorMessage(ErrorType.None);
      if (typeof data === 'boolean') {
        await updateTodo(id, { completed: data });
      } else {
        await updateTodo(id, { title: data });
      }

      setTodos(todos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = typeof data === 'boolean' ? {
            ...todo,
            completed: data,
          } : {
            ...todo,
            title: data,
          };

          return updatedTodo;
        }

        return todo;
      }));
    } catch (error) {
      setErrorMessage(ErrorType.Update);
    }
  };

  const toggleAll = async () => {
    const todosForUpdate = activeTodosCount
      ? activeTodos
      : todos;

    const x = todosForUpdate.map(todo => (
      updateTodo(todo.id, { completed: !todo.completed })));

    try {
      setErrorMessage(ErrorType.None);
      await Promise.all(x);
      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: !!activeTodosCount,
      }));

      setTodos([...updatedTodos]);
    } catch (error) {
      setErrorMessage(ErrorType.Update);
    }
  };

  return (
    <>
      <div className="todoapp">
        <header className="header">
          <h1>{`${user ? `${user.name}'s` : ''} todos`}</h1>
          <HeaderForm
            createNewTodo={createNewTodo}
          />
        </header>

        {!!allTodosCount && (
          <>
            <section className="main">
              <ToggleAll
                hasActive={!!activeTodosCount}
                toggleAll={toggleAll}
              />

              <TodoList
                items={visibleTodos}
                handleUpdate={handleUpdate}
                removeTodo={removeTodo}
              />
            </section>

            <Footer
              allTodosCount={allTodosCount}
              activeTodosCount={activeTodosCount}
              onClearCompleted={removeCompletedTodos}
            />
          </>
        )}
      </div>

      {!!errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          onCloseError={() => setErrorMessage(ErrorType.None)}
        />
      )}
    </>
  );
};
