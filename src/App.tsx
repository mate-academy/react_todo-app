import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';

import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodoTitle,
  AuthContext,
  NewTodoForm,
  TodoList,
  Footer,
  ErrorNotification,
  Todo,
  Status,
} from './imports';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { filterParam = '' } = useParams();

  const user = useContext(AuthContext);
  const userId = user ? user?.id : 0;

  if (error) {
    setTimeout(() => setError(''), 3000);
  }

  const loadTodos = async () => {
    setError('');

    try {
      const response = await getTodos(userId);

      setTodos(response);
    } catch {
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useMemo(() => {
    switch (filterParam) {
      case '':
        return setFilter(Status.All);

      case 'active':
        return setFilter(Status.Active);

      case 'completed':
        return setFilter(Status.Completed);

      default:
        return null;
    }
  }, [filterParam]);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Status.All:
        return todo;

      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return null;
    }
  });

  const handleDeleteTodo = async (todoId: number) => {
    setError('');

    try {
      await deleteTodo(todoId);

      setTodos(prevTodos => prevTodos.filter(
        todo => todo.id !== todoId,
      ));
    } catch {
      setError('Couldn\'t remove todo');
    }
  };

  const handleAddTodo = async (title: string) => {
    setError('');
    setIsAdding(true);

    if (title.trim() === '') {
      setError('Title cannot be empty');

      return setIsAdding(false);
    }

    try {
      const response = await createTodo({
        userId,
        title,
        completed: false,
      });

      return setTodos(prevTodos => [...prevTodos, response]);
    } catch {
      return setError('Cannot add a new todo');
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    setError('');

    try {
      await toggleTodo(todo.id, !todo.completed);

      setTodos(prevTodos => prevTodos.map(prevTodo => {
        if (todo.id === prevTodo.id) {
          return {
            ...prevTodo,
            completed: !prevTodo.completed,
          };
        }

        return prevTodo;
      }));
    } catch {
      setError('Cannot toggle todo status');
    }
  };

  const handleUpdateTodo = async (todoId: number, title: string) => {
    setError('');

    try {
      const response = await updateTodoTitle(todoId, title);

      setTodos(prevTodos => prevTodos.map(prevTodo => {
        if (prevTodo.id === todoId) {
          return response;
        }

        return prevTodo;
      }));
    } catch {
      setError('Couldn\'t update todo');
    }
  };

  const handleToggleAll = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError('');

    try {
      await todos.forEach(todo => {
        toggleTodo(todo.id, event.target.checked);
      });

      setTodos(prevTodos => prevTodos.map(prevTodo => {
        return {
          ...prevTodo,
          completed: !event.target.checked,
        };
      }));
    } catch {
      setError('Cannot toggle todos');
    }
  };

  return (
    <>
      <div className="todoapp">
        <header className="header">
          <NewTodoForm
            onAdd={handleAddTodo}
            isAdding={isAdding}
          />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={todos.every(todo => todo.completed)}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          {todos.length > 0 && (
            <>
              <TodoList
                todos={filteredTodos}
                onToggle={handleToggleTodo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />

              <Footer
                todos={todos}
                onDelete={handleDeleteTodo}
              />
            </>
          )}
        </section>

      </div>
      <ErrorNotification
        error={error}
        closeError={setError}
      />
    </>
  );
};
