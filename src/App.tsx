import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo, FilterType } from './types/Todo';
import { AddInput } from './components/AddInput/AddInput';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { Loading } from './components/isLoading';
import { TodoList } from './components/TodoList';
import { AddError } from './components/AddError/AddError';
import {
  getTodo,
  deleteTodo,
  postTodo,
  updateTodo,
} from './api/todos';
import { TodoItem } from './components/TodoItem';

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isDisableInput, setIsDisableInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const completedTodos = todos.every((todo) => todo.completed);

  const [user, setUser] = useState(() => {
    const data = localStorage.getItem('user');

    return data ? JSON.parse(data) : null;
  });

  const USER_ID = user ? user.id : null;

  function generateUniqId() {
    return Math.floor(Math.random() * 1000000000);
  }

  const fetchData = async () => {
    setIsLoading(true);
    const todosFromServer = await getTodo(USER_ID);

    try {
      setTodo(todosFromServer);
    } catch {
      setError('Unable to load a todo');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTodo = useMemo(() => {
    return todos.filter((todo) => {
      switch (filterType) {
        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, filterType]);

  const handleAddTodo = async (title: string) => {
    try {
      setIsDisableInput(true);

      const data = {
        id: generateUniqId(),
        userId: USER_ID,
        title,
        completed: false,
      };

      const newTodo = await postTodo(data);

      setTodo(todo => [...todo, newTodo]);
      setTempTodo({ ...data, id: 0 });
    } catch {
      setError('Unable to add a todo');
    } finally {
      setTempTodo(null);
      setIsDisableInput(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      const currentTodo = todos.filter((todo) => todo.id !== id);

      setTodo(currentTodo);
      setError('');
    } catch {
      setError('Unable to delete a todo');
    }
  };

  const handleClearCompleted = async () => {
    const completedMap = todos.filter(todo => todo.completed);

    try {
      completedMap.map(todo => deleteTodo(todo.id));

      setTodo(todos.filter(todo => !todo.completed));
    } catch {
      setError('Unable to clear completed a todo');
    }
  };

  const handleToggleAll = async () => {
    try {
      const updateCompleted = todos.map((todo) => {
        if (todo.completed === completedTodos) {
          updateTodo(todo.id, { completed: !completedTodos });
        }

        return { ...todo, completed: !completedTodos };
      });

      setTodo(updateCompleted);
    } catch {
      setError('Unable to update a todo');
    }
  };

  const handleUpdateTodo = async (id: number, data: Partial<Todo>) => {
    try {
      await updateTodo(id, data);

      setTodo(prev => prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, ...data };
        }

        return todo;
      }));
    } catch {
      setError('Unable to update a todo');
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('');

        return () => {
          clearTimeout(timeout);
        };
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    fetchData();
  }, []);

  if (!USER_ID) {
    return <UserWarning setUser={setUser} />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {isLoading
        ? <Loading />
        : (
          <div className="todoapp__content">
            <AddInput
              isDisableInput={isDisableInput}
              handleAddTodo={handleAddTodo}
              setError={setError}
              handleToggleAll={handleToggleAll}
              completedTodos={completedTodos}
            />

            <TodoList
              todos={filterTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateTodo={handleUpdateTodo}
              setError={setError}
            />
            {tempTodo && (
              <TodoItem
                todo={tempTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleUpdateTodo={handleUpdateTodo}
                setError={setError}
              />
            )}

            {todos.length > 0 && (
              <TodoFilter
                todos={todos}
                filterType={filterType}
                setFilterType={setFilterType}
                handleClearCompleted={handleClearCompleted}
              />
            )}
          </div>
        )}

      {error || (
        <AddError
          error={error}
        />
      )}
    </div>
  );
};
