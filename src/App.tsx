import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  createTodo, deleteTodo, getTodos, updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { useFilter } from './utils/useFilter';
import { Sort } from './types/Sort';
import TodosContext from './context';
import { useLocalStorage } from './utils/useLocalStorage';

const USER_ID = 6771;

export const App: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [sortBy, setSortBy] = useState<Sort>(Sort.All);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingTodo, setLoadingTodo] = useState<number[]>([0]);
  const location = useLocation();

  const sortedTodos = useFilter(todos, location);
  const activeTodos = todos.filter((todo: Todo) => !todo.completed);
  const completedTodos = todos.filter((todo: Todo) => todo.completed);
  const isCompletedTodos = todos.every((todo: Todo) => todo.completed);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const todosData = await getTodos(USER_ID);

      setTodos(todosData);
    } catch {
      setErrorMessage('Error loading data');
    } finally {
      setLoading(false);
    }
  }, [setTodos, setLoading, setErrorMessage]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    if (!title.trim()) {
      setErrorMessage('Title can\'t be empty');

      return;
    }

    setIsInputDisabled(true);

    try {
      const newTodo = await createTodo(USER_ID, {
        title,
        userId: USER_ID,
        completed: false,
      });

      setTempTodo({ ...newTodo, id: 0 });

      setTodos([...todos, newTodo]);
    } catch {
      setErrorMessage('Unable to add a todo');
    } finally {
      setIsInputDisabled(false);
      setTempTodo(null);
    }
  };

  const removeTodo = useCallback(async (selectedTodoId: number) => {
    setLoadingTodo((prevTodo) => [...prevTodo, selectedTodoId]);
    try {
      await deleteTodo(selectedTodoId);
      setTodos((state: Todo[]) => (
        state.filter(stateItem => stateItem.id !== selectedTodoId)));
    } catch {
      setErrorMessage('Unable to delete a todo');
    } finally {
      setLoadingTodo([0]);
    }
  }, [setErrorMessage, setLoading, setTodos]);

  const handleRemoveCompletedTodos = useCallback(() => {
    completedTodos.forEach((todo: Todo) => removeTodo(todo.id));
    setTodos(activeTodos);
  }, [todos]);

  const editTodo = async (id: number,
    data: {
      completed?: boolean,
      title?: string,
    }) => {
    setLoadingTodo((prevTodo) => [...prevTodo, id]);
    try {
      await updateTodo(id, data);
      setTodos((state: Todo[]) => state.map(todo => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          ...data,
        };
      }));
    } catch {
      setErrorMessage('Unable to edit a todo');
    } finally {
      setLoadingTodo([0]);
    }
  };

  const handleToggleAll = () => {
    if (isCompletedTodos) {
      completedTodos.map((item: Todo) => {
        return editTodo(item.id, { completed: false });
      });
    } else {
      sortedTodos.map((todoElem: Todo) => {
        return editTodo(todoElem.id, { completed: true });
      });
    }
  };

  return (
    <TodosContext.Provider value={{
      isLoading,
      todos: sortedTodos,
      deleteTodo: removeTodo,
      editTodo,
      addTodo,
      isInputDisabled,
      handleRemoveCompletedTodos,
      setSort: setSortBy,
      sort: sortBy,
      errorType: errorMessage,
      setErrorType: setErrorMessage,
      handleToggleAll,
      loadingTodo,
      tempTodo,
      activeTodos,
      completedTodos,
      isCompletedTodos,
    }}
    >
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <div className="todoapp__content">
          <Header />
          <TodoList />
          {sortedTodos.length > 0 && <Footer />}
        </div>

        {errorMessage && (
          <Error />
        )}
      </div>
    </TodosContext.Provider>
  );
};
