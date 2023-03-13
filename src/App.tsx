/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-param-reassign */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { NewTodoField } from './components/NewTodoField/NewTodoField';
import { TodoFilters } from './components/TodoFilters/TodoFilters';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [isUploadError, setIsUploadError] = useState(false);
  const [error, setError] = useState(ErrorType.None);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const [deletedTodosId, setDeletedTodosId] = useState<number[]>([]);
  const [activeTodoId, setActiveTodoId] = useState<number[]>([]);
  const [updatedTodoID, setUpdatedTodoID] = useState<number[]>([]);

  const user = useContext(AuthContext);

  const loadTodosFromServer = async () => {
    try {
      if (user) {
        const getTodosFromServer = await getTodos(user.id);

        setTodos(getTodosFromServer);
      }
    } catch (e) {
      setError(ErrorType.LoadError);
    }
  };

  const uploadTodosOnServer = async (todo: Todo) => {
    if (user) {
      setIsTodoLoading(true);

      try {
        setActiveTodoId([0]);
        setTempTodo(todo);
        const newTodo = await createTodo({
          title: todo.title,
          userId: todo.userId,
          completed: false,
        });

        setTodos(prevTodos => [...prevTodos, newTodo]);
        setActiveTodoId([]);
      } catch {
        setIsUploadError(true);
        setError(ErrorType.UploadError);
      } finally {
        setTempTodo(null);
        setIsTodoLoading(false);
      }
    }
  };

  const hendleRemoveTodo = async (id: number) => {
    try {
      setDeletedTodosId(prevIds => [...prevIds, id]);
      await deleteTodo(id);
      const visibleTodos = filtredTodos.filter(todo => {
        return todo.id !== id;
      });

      setTodos(visibleTodos);
    } catch {
      setError(ErrorType.RemoveError);
    }

    setDeletedTodosId([]);
  };

  const editTodo = async (id: number, newTitle: string) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.title = newTitle;
      }

      return todo;
    });

    setTodos(updatedTodos);

    try {
        setUpdatedTodoID(prevIds => [...prevIds, id]);
        await updateTodo(id, { title: newTitle });

    } catch {
      setError(ErrorType.UpdatedError);
    }

    setUpdatedTodoID([]);
  };

  const clearCompleted = async () => {
    const doneTasks = todos.filter(todo => todo.completed);
    const doneIds = doneTasks.map((todo) => {
      return todo.id;
    });

    setDeletedTodosId(doneIds);

    await Promise.all(doneTasks.map((todo) => deleteTodo(todo.id)));

    const visibleTodos = filtredTodos.filter(todo => {
      return !todo.completed;
    });

    setTodos(visibleTodos);

    setDeletedTodosId([]);
  };

  const hendeleCheckboxChange = async (id: number, completed: boolean) => {
    try {
      await updateTodo(id, { completed: !completed });

      const checkedTodoList = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !completed };
        }

        return todo;
      });

      setTodos(checkedTodoList);
    } catch {
      setError(ErrorType.UpdatedError);
    }
  };

  const completedTodos = useMemo(() => {
    const finishedTodos = todos.filter(todo => todo.completed);

    return finishedTodos.length;
  }, [todos]);

  const toggleAll = async () => {
    const totalTodos = todos.length;
    const areTodosComplited
    = todos.filter(todo => todo.completed).length === totalTodos;

    setTodos(todos.map(todo => ({ ...todo, completed: !areTodosComplited })));

    try {
      const notCompletedTodos = todos.filter(todo => !todo.completed);

      if (notCompletedTodos.length) {
        notCompletedTodos.forEach(async todo => {
          updateTodo(todo.id, { completed: !todo.completed });
        });
      } else {
        todos.forEach(async todo => {
          updateTodo(todo.id, { completed: !todo.completed });
        });
      }
    } catch {
      setError(ErrorType.UpdatedError);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">

        <NewTodoField
          onAdd={uploadTodosOnServer}
          toggleAll={toggleAll}
          isUploadError={isUploadError}
          setError={setError}
          isTodoLoading={isTodoLoading}
        />
        <TodoList
          filtredTodos={filtredTodos}
          isTodoLoading={isTodoLoading}
          deletedTodosId={deletedTodosId}
          tempTodo={tempTodo}
          activeTodoId={activeTodoId}
          onDelete={hendleRemoveTodo}
          hendeleCheckboxChange={hendeleCheckboxChange}
          editTodo={editTodo}
          updatedTodoID={updatedTodoID}
        />
        <TodoFilters
          todos={todos}
          setFiltredTodos={setFiltredTodos}
          clearCompleted={clearCompleted}
          completedTodos={completedTodos}
        />
      </div>

      {error !== ErrorType.None && (
        <ErrorNotification
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};
