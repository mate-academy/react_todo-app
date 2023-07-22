/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { Filter } from './enums/filter';
import { ErrorMessage } from './enums/error';
import { Error } from './components/Error';
import { TodoList } from './components/TodoList';
import {
  getTodos,
  addTodos,
  deleteTodo,
  updateTodos,
} from './api/todos';

const USER_ID = 10567;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState(Filter.All);
  const [errorMessage, setErrorMessage]
  = useState<ErrorMessage>(
    ErrorMessage.NONE,
  );
  const [value, setValue] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [deletedTodosId, setDeletedTodosId] = useState<number[] | []>([]);
  const [activeFormInput, setActiveFormInput] = useState(false);
  const formInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formInputRef.current && activeFormInput) {
      formInputRef.current.focus();
    }

    setActiveFormInput(false);
  }, [todos]);

  const fetchData = async () => {
    try {
      const response = await getTodos(USER_ID);
      const todosData = response as Todo[];

      setTodos(todosData);
    } catch (error) {
      setErrorMessage(ErrorMessage.LOAD);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => (
      setErrorMessage(ErrorMessage.NONE)
    ), 3000);
  }, [errorMessage]);

  const handleDeletedTodo = (id: number) => {
    setDeletedTodosId([id]);

    deleteTodo(id)
      .then(() => {
        const newTodoList = todos.filter(todo => todo.id !== id);

        setTodos(newTodoList);
      })
      .catch(() => setErrorMessage(ErrorMessage.DELETE))
      .finally(() => setDeletedTodosId([]));
  };

  const handleUpdateTodo = (id: number) => {
    setDeletedTodosId([id]);

    const updateTodo = todos.find(todo => todo.id === id);

    if (updateTodo) {
      updateTodos(id, {
        ...updateTodo,
        completed: !updateTodo.completed,
      })
        .then(() => {
          const newTodoList = todos.map(todo => {
            return todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo;
          });

          setTodos(newTodoList);
        })
        .catch(() => setErrorMessage(ErrorMessage.UPDATE))
        .finally(() => setDeletedTodosId([]));
    }
  };

  const updateStatusTodos = (newStatus: boolean) => {
    Promise.all(todos.map(todo => {
      return todo.completed !== newStatus
        ? updateTodos(todo.id, { ...todo, completed: newStatus })
        : todo;
    }))
      .then(() => {
        const newTodoList = todos.map(todo => ({
          ...todo,
          completed: newStatus,
        }));

        setTodos(newTodoList);
      })
      .catch(() => setErrorMessage(ErrorMessage.UPDATE))
      .finally(() => setDeletedTodosId([]));
  };

  const handleUpdateStatusTodo = () => {
    const isAllCompletedTodos = todos.every(todo => todo.completed);

    if (isAllCompletedTodos) {
      const allTodos = todos.map(todo => todo.id);

      setDeletedTodosId(allTodos);

      updateStatusTodos(false);
    } else {
      const activeTodosId = todos
        .filter(todo => !todo.completed)
        .map(todo => todo.id);

      setDeletedTodosId(activeTodosId);

      updateStatusTodos(true);
    }
  };

  const handleClearTodo = () => {
    const completedTodosId = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    setDeletedTodosId(completedTodosId);

    Promise.all(completedTodosId.map(id => deleteTodo(id)))
      .then(() => {
        const filteredTodos = todos.filter(todo => !todo.completed);

        setTodos(filteredTodos);
      })
      .catch(() => setErrorMessage(ErrorMessage.DELETE))
      .finally(() => setDeletedTodosId([]));
  };

  const handleAddTodo = (event:
  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim()) {
      setDeletedTodosId([0]);

      setTempTodo({
        id: 0,
        userId: USER_ID,
        title: value,
        completed: false,
      });

      const newTodo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        userId: USER_ID,
        title: value,
        completed: false,
      };

      addTodos(USER_ID, newTodo)
        .then(() => {
          setTodos([...todos, newTodo]);
        })
        .catch(() => setErrorMessage(ErrorMessage.ADD))
        .finally(() => {
          setValue('');
          setTempTodo(null);
          setDeletedTodosId([]);
        });
    } else {
      setErrorMessage(ErrorMessage.EMPTY);
    }

    setActiveFormInput(true);
  };

  const filteredTodos = useMemo(() => {
    return todos?.filter(todo => {
      switch (filterValue) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, filterValue]);

  const hasCompletedTodos = todos.some(todo => todo.completed);
  const amountOfActiveTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          amountOfActiveTodos={amountOfActiveTodos}
          value={value}
          setValue={setValue}
          handleAddTodo={handleAddTodo}
          deletedTodosId={deletedTodosId}
          handleUpdateStatusTodos={handleUpdateStatusTodo}
          todos={todos}
          formInputRef={formInputRef}
        />
        <TodoList
          todos={filteredTodos}
          tempTodo={tempTodo}
          deletedTodosId={deletedTodosId}
          handleDeletedTodo={handleDeletedTodo}
          handleUpdatedTodo={handleUpdateTodo}
          setDeletedTodosId={setDeletedTodosId}
          setTodos={setTodos}
          setError={setErrorMessage}
        />

        {(!!todos.length || !!deletedTodosId.length) && (
          <Footer
            filterValue={filterValue}
            setFilter={setFilterValue}
            hasCompletedTodos={hasCompletedTodos}
            amountOfActiveTodos={amountOfActiveTodos}
            handleClearTodo={handleClearTodo}
          />
        )}
      </div>

      {!!errorMessage && (
        <Error
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
