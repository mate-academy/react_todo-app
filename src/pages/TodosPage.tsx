import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import {
  addTodo,
  getTodos,
  patchTodo,
  removeTodo,
} from '../api/todos';

import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';

import { ErrorNotification } from '../components/ErrorNotification';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { TodosFilter } from '../components/TodosFilter';
import { Logout } from '../components/Logout';

export const TodosPage: FC = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isAdding, setIsAdding] = useState(false);
  const [todoIdsLoading, setTodoIdsLoading] = useState<number[]>([]);
  const [tempTodoTitle, setTempTodoTitle] = useState('');
  const [searchParams] = useSearchParams();

  const selectedStatus = searchParams.get('selectedStatus') || null;

  const tempTodo = useMemo(() => ({
    id: 0,
    userId: 0,
    title: tempTodoTitle,
    completed: false,
  }), [tempTodoTitle]);

  const filteredTodos = useMemo(() => (
    todos.filter((todo) => {
      switch (selectedStatus) {
        case FilterStatus.Active:
          return !todo.completed;

        case FilterStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    })
  ), [todos, selectedStatus]);

  const completedTodos = useMemo(() => (
    todos.filter((todo) => todo.completed)
  ), [todos]);

  const closeNotification = useCallback(() => (
    setHasError(false)
  ), []);

  const generateError = useCallback((message: string) => {
    setErrorMessage(message);
    setHasError(true);
  }, []);

  const getTodosFromServer = useCallback(async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      generateError('Unable to show todos!');
    }
  }, [user]);

  const addTodoToServer = useCallback(async (todoTitle: string) => {
    if (user) {
      try {
        setIsAdding(true);
        setTempTodoTitle(todoTitle);

        await addTodo({
          userId: user.id,
          title: todoTitle,
          completed: false,
        });

        await getTodosFromServer();
      } catch (error) {
        generateError('Unable to add a todo!');
      } finally {
        setIsAdding(false);
      }
    }
  }, [user]);

  const removeTodoFromServer = useCallback(async (todoId: number) => {
    try {
      setTodoIdsLoading((currentIds) => [...currentIds, todoId]);

      await removeTodo(todoId);
      await getTodosFromServer();

      setTodoIdsLoading((currentIds) => (
        currentIds.filter((id) => id !== todoId)
      ));
    } catch (error) {
      generateError(`Unable to remove todo with id #${todoId}!`);
    }
  }, [todos]);

  const removeAllCompletedTodos = useCallback(async () => {
    try {
      await Promise.all(completedTodos.map(({ id }) => (
        removeTodoFromServer(id)
      )));
    } catch (error) {
      generateError('Unable to remove all completed todos!');
    }
  }, [completedTodos]);

  const toggleTodoStatusOnServer = useCallback(async (
    todoId: number,
    status: boolean,
  ) => {
    try {
      setTodoIdsLoading((currentIds) => [...currentIds, todoId]);

      await patchTodo(todoId, { completed: status });
      await getTodosFromServer();

      setTodoIdsLoading((currentIds) => (
        currentIds.filter((id) => id !== todoId)
      ));
    } catch (error) {
      generateError(`Unable to update the status of todo with id #${todoId}!`);
    }
  }, [todos]);

  const toggleAllTodosStatusOnServer = useCallback(async () => {
    try {
      const todosToToggleStatus = completedTodos.length !== todos.length
        ? todos.filter(({ completed }) => !completed)
        : todos;

      await Promise.all(todosToToggleStatus.map(({ id, completed }) => (
        toggleTodoStatusOnServer(id, !completed)
      )));
    } catch (error) {
      generateError('Unable to toggle all todos status!');
    }
  }, [todos]);

  const changeTodoTitleOnServer = useCallback(async (
    todoId: number,
    newTitle: string,
  ) => {
    try {
      setTodoIdsLoading((currentIds) => [...currentIds, todoId]);

      await patchTodo(todoId, { title: newTitle });
      await getTodosFromServer();

      setTodoIdsLoading((currentIds) => (
        currentIds.filter((id) => id !== todoId)
      ));
    } catch (error) {
      generateError(`Unable to change the title of todo with id #${todoId}!`);
    }
  }, [todos]);

  const isFilterVisible = useMemo(() => (
    todos.length > 0 || isAdding
  ), [todos, isAdding]);

  useEffect(() => {
    setTimeout(() => setHasError(false), 2000);
  }, [hasError]);

  useEffect(() => {
    getTodosFromServer();
  }, [user]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">
        todos
      </h1>

      <div className="todoapp__content">
        <TodoForm
          isAdding={isAdding}
          generateError={generateError}
          addTodoToServer={addTodoToServer}
          toggleAllTodosStatusOnServer={toggleAllTodosStatusOnServer}
        />

        <TodoList
          filteredTodos={filteredTodos}
          isAdding={isAdding}
          tempTodo={tempTodo}
          todoIdsLoading={todoIdsLoading}
          removeTodoFromServer={removeTodoFromServer}
          toggleTodoStatusOnServer={toggleTodoStatusOnServer}
          changeTodoTitleOnServer={changeTodoTitleOnServer}
        />

        {isFilterVisible && (
          <TodosFilter
            todosLength={todos.length}
            completedTodosLength={completedTodos.length}
            removeAllCompletedTodos={removeAllCompletedTodos}
          />
        )}
      </div>

      <ErrorNotification
        hasError={hasError}
        errorMessage={errorMessage}
        closeNotification={closeNotification}
      />

      <Logout />
    </div>
  );
};
