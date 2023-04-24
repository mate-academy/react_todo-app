import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Todo } from './types/Todo';
import { Error } from './types/Error';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { TodoFilter } from './components/TodoFilter';
import {
  postTodo,
  deleteTodo,
  patchTodo,
  getTodos,
} from './api/todos';
import { Loader } from './components/Loader';
import { useLoadingTodos } from './hooks/useLoadingTodos';
import { USER_ID } from './utils/constants';
import { FilterType } from './types/FilterType';

const getFilterType = (pathname: string): FilterType => {
  switch (pathname) {
    case '/active':
      return FilterType.Active;

    case '/completed':
      return FilterType.Completed;

    default:
      return FilterType.All;
  }
};

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<Error>(Error.None);
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [disabledInput, setDisabledInput] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    addLoadingTodo,
    removeLoadingTodo,
    isTodoLoading,
  } = useLoadingTodos();

  const { pathname } = useLocation();
  const filterType = getFilterType(pathname);

  const removeError = useCallback(() => {
    setErrorMessage(Error.None);
  }, []);

  const showError = useCallback((errorType: Error) => {
    setErrorMessage(errorType);
    setTimeout(() => {
      removeError();
    }, 3000);
  }, []);

  const addTodo = useCallback(async (title: string) => {
    try {
      setDisabledInput(true);

      const newTodo = {
        title,
        userId: USER_ID,
        completed: false,
      };

      setTempTodo({ ...newTodo, id: 0 });

      const addedTodo = await postTodo(newTodo);

      setTodos(state => [...state, addedTodo]);
    } catch {
      showError(Error.Add);
    } finally {
      setDisabledInput(false);
      setTempTodo(null);
    }
  }, []);

  const removeTodo = useCallback(async (id: number) => {
    try {
      addLoadingTodo(id);
      await deleteTodo(id);

      setTodos(state => state.filter(todo => todo.id !== id));
    } catch {
      showError(Error.Delete);
    } finally {
      removeLoadingTodo(id);
    }
  }, [addLoadingTodo, removeLoadingTodo]);

  const removeCompleted = useCallback(() => {
    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    completedIds.forEach(id => {
      deleteTodo(id)
        .then(() => {
          setTodos(todos.filter(task => !task.completed));
        })
        .catch(() => {
          showError(Error.Delete);
        });
    });
  }, [todos]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    }, [],
  );

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      showError(Error.Title);

      return;
    }

    addTodo(query.trim());
    setQuery('');
  }, [query]);

  const handleUpdate = useCallback(async (id: number, data: Partial<Todo>) => {
    addLoadingTodo(id);

    try {
      await patchTodo(id, data);

      setTodos(state => state.map(todo => {
        if (todo.id === id) {
          return { ...todo, ...data };
        }

        return todo;
      }));
    } catch {
      showError(Error.Update);
    } finally {
      removeLoadingTodo(id);
    }
  }, [addLoadingTodo, removeLoadingTodo]);

  const handleToggleAll = useCallback(() => {
    const areAllDone = todos.every(todo => todo.completed);

    if (areAllDone) {
      todos.forEach(el => {
        handleUpdate(el.id, { completed: false });
      });
    } else {
      const notDoneTodos = todos.filter(el => !el.completed);

      notDoneTodos.forEach(element => {
        handleUpdate(element.id, { completed: true });
      });
    }
  }, [todos]);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch {
        showError(Error.Load);
      } finally {
        setIsLoading(false);
      }
    };

    getTodosFromServer();
  }, []);

  const remainingTodos = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.length - remainingTodos;

  return (
    <div className="todoapp">
      {isLoading
        ? <Loader />
        : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px',
              maxWidth: 566,
              padding: '36px 30px 56px',
              margin: '0 auto',
              backgroundColor: '#ECFFFD',
              boxShadow: '8px 18px 31px rgba(0, 0, 0, 0.25)',
              borderRadius: '30px',
              textAlign: 'center',
            }}
          >
            <Header
              onToggleAll={handleToggleAll}
              onSubmit={handleSubmit}
              query={query}
              onInputChange={handleInputChange}
              remainingTodos={remainingTodos}
              disabledInput={disabledInput}
            />

            <TodoFilter
              onRemoveCompleted={removeCompleted}
              completedTodos={completedTodos}
              filterType={filterType}
            />

            <TodoList
              todos={todos}
              filterType={filterType}
              tempTodo={tempTodo}
              isTodoLoading={isTodoLoading}
              onDelete={removeTodo}
              onUpdateTodo={handleUpdate}
            />
          </Box>
        )}

      <Notification error={errorMessage} onDelete={removeError} />
    </div>
  );
};
