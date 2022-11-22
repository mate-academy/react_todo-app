/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodoStatus,
  updateTodoTitle,
} from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { NewTodoField } from './components/NewTodoField';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './types/ErrorMessage';
import { Todo } from './types/Todo';

const defaultTodo = {
  id: 0,
  userId: 0,
  title: '',
  completed: false,
};

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  if (!user) {
    return null;
  }

  const newTodoField = useRef<HTMLInputElement>(null);
  const { filter = 'all' } = useParams();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage]
    = useState<ErrorMessage>(ErrorMessage.None);
  const [temporaryTodo, setTemporaryTodo] = useState(defaultTodo);

  const numberOfTodos = useMemo(() => todos.length, [todos]);

  const numberOfCompletedTodos = useMemo(() => {
    return [...todos].filter(todo => todo.completed).length;
  }, [todos]);

  const areAllCompleted = useMemo(() => {
    return (todos.filter((todo) => todo.completed).length === todos.length
      && todos.length > 0);
  }, [numberOfCompletedTodos, numberOfTodos]);

  const visibleTodos = useMemo(() => {
    return [...todos].filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        case 'all':
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const updateTodoList = () => {
    getTodos(user.id)
      .then(result => setTodos(result))
      .catch(() => {
        setErrorMessage(ErrorMessage.CannotLoadTodos);
      });
  };

  const createTodo = useCallback((title: string) => {
    if (title.length === 0) {
      setErrorMessage(ErrorMessage.EmptyTitle);

      return;
    }

    setTemporaryTodo({
      ...temporaryTodo,
      title,
    });

    setIsAdding(true);

    addTodo(user.id, title)
      .catch(() => setErrorMessage(ErrorMessage.UnableToAdd))
      .finally(() => {
        setIsAdding(false);
        updateTodoList();
      });
  }, [user]);

  const toggleTodo = useCallback((todoId: number, completed: boolean) => {
    updateTodoStatus(todoId, completed)
      .catch(() => setErrorMessage(ErrorMessage.UnableToUpdate))
      .finally(() => updateTodoList());
  }, []);

  const removeTodo = useCallback((todoId: number) => {
    deleteTodo(todoId)
      .catch(() => setErrorMessage(ErrorMessage.UnableToDelete))
      .finally(() => updateTodoList());
  }, []);

  const changeTodoTitle = useCallback((todoId: number, title: string) => {
    updateTodoTitle(todoId, title)
      .catch(() => setErrorMessage(ErrorMessage.UnableToUpdate))
      .finally(() => updateTodoList());
  }, []);

  const hideError = useCallback(() => setErrorMessage(ErrorMessage.None), []);

  const deleteCompletedTodos = useCallback(() => {
    return [...todos].forEach(todo => {
      if (todo.completed) {
        deleteTodo(todo.id)
          .catch(() => setErrorMessage(ErrorMessage.UnableToDelete))
          .finally(() => updateTodoList());
      }
    });
  }, [todos]);

  const toggleAll = () => {
    [...todos].forEach(todo => {
      toggleTodo(todo.id, !areAllCompleted);
    });
  };

  useEffect(() => {
    updateTodoList();
  }, []);

  return (
    <>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTodoField
            newTodoField={newTodoField}
            createTodo={createTodo}
            isAdding={isAdding}
          />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={areAllCompleted}
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={visibleTodos}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            changeTodoTitle={changeTodoTitle}
          />
        </section>

        {todos.length > 0 && (
          <Footer
            filter={filter}
            numberOfCompletedTodos={numberOfCompletedTodos}
            numberOfTodos={numberOfTodos}
            deleteCompleted={deleteCompletedTodos}
          />
        )}

        {errorMessage && (
          <ErrorNotification
            errorMessage={errorMessage}
            hideError={hideError}
          />
        )}
      </div>

      <span className="username">
        {user.name}
        &apos;s todo list
      </span>
    </>
  );
};
