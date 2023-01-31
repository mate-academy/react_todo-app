import React, {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { Erorr } from './components/Error/Error';
import { FilterTodoList } from './components/FilterTodoList/FilterTodoList';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TypeError } from './types/ErrorType';
import { Todo } from './types/Todo';
import {
  getTodos,
  addTodos,
  deleteTodos,
  toggleTodo,
  renameTodo,
} from './api/todos';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<TypeError>(TypeError.NONE);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [deletedTodosIds, setDeletedTodoIds] = useState<number[]>([]);
  const [selectedTodoIds, setSelectedTodoIds] = useState<number[]>([]);

  const loadTodosFromServer = useCallback(async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch {
        setHasError(true);
        setErrorType(TypeError.LOAD);
      }
    }
  }, [user]);

  const newTodoTitleHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setNewTodoTitle(event.target.value);

  const removeErorrHandler = () => {
    setHasError(false);
    setErrorType(TypeError.NONE);
  };

  const isEachTodoCompleted = useMemo(
    () => todos.every(todo => todo.completed), [todos],
  );

  const submitNewTodoHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (user) {
      setIsAdding(true);

      try {
        if (!newTodoTitle.trim().length) {
          setHasError(true);
          setErrorType(TypeError.TITLE);
          setIsAdding(false);

          return;
        }

        setTimeout(async () => {
          await addTodos(newTodoTitle, user.id);
          await loadTodosFromServer();
        }, 100);

        setHasError(false);
        setIsAdding(false);
        setNewTodoTitle('');
      } catch {
        setErrorType(TypeError.ADD);
        setHasError(true);
      }
    }
  };

  const handleToggleTodo = useCallback(
    async (todoId: number, completed: boolean) => {
      setSelectedTodoIds(currentTodoIds => [...currentTodoIds, todoId]);

      try {
        await toggleTodo(todoId, !completed);
        await loadTodosFromServer();

        setSelectedTodoIds(currentTodoIds => (
          currentTodoIds.filter(id => id !== todoId)
        ));
      } catch {
        setErrorType(TypeError.UPDATE);
        setHasError(true);
        setSelectedTodoIds([]);
      }
    }, [],
  );

  const clearAllHandler = useCallback(async () => {
    try {
      const completedTodoIds = todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);

      setDeletedTodoIds(completedTodoIds);

      await Promise.all(todos.map(async todo => {
        if (todo.completed) {
          await deleteTodos(todo.id);
        }

        return todo;
      }));

      await loadTodosFromServer();
    } catch {
      setErrorType(TypeError.DELETE);
      setHasError(true);
      setDeletedTodoIds([]);
    }
  }, [todos]);

  const deleteTodoHandler = useCallback(
    async (todoId: number) => {
      setDeletedTodoIds([todoId]);

      try {
        await deleteTodos(todoId);
        await loadTodosFromServer();
      } catch {
        setErrorType(TypeError.DELETE);
        setHasError(true);
        setDeletedTodoIds([]);
      }
    }, [],
  );

  const handleToggleAllTodos = useCallback(async () => {
    try {
      await Promise.all(todos.map(async (todo) => {
        if (!todo.completed || isEachTodoCompleted) {
          setSelectedTodoIds(currentTodoIds => [...currentTodoIds, todo.id]);

          await toggleTodo(todo.id, !todo.completed);
        }
      }));

      await loadTodosFromServer();

      setSelectedTodoIds([]);
    } catch {
      setErrorType(TypeError.UPDATE);
      setHasError(true);
      setSelectedTodoIds([]);
    }
  }, [selectedTodoIds]);

  const handleChangeTodoTittle = useCallback(
    async (todoId: number, title: string) => {
      setSelectedTodoIds([todoId]);

      try {
        await renameTodo(todoId, { title });
        await loadTodosFromServer();

        setSelectedTodoIds([]);
      } catch {
        setErrorType(TypeError.UPDATE);
        setHasError(true);

        setSelectedTodoIds([]);
      }
    }, [],
  );

  useEffect(() => {
    loadTodosFromServer();
  }, [todos, loadTodosFromServer]);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterType) {
        case FilterType.All:
          return todo;

        case FilterType.Active:
          return !todo.completed;

        case FilterType.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [todos, filterType]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: isEachTodoCompleted,
              })}
              aria-label="Toggle"
              onClick={handleToggleAllTodos}
            />
          )}

          <NewTodo
            newTodoTitle={newTodoTitle}
            newTodoTitleHandler={newTodoTitleHandler}
            submitNewTodoHandler={submitNewTodoHandler}
            isAdding={isAdding}
          />
        </header>

        <TodoList
          todos={visibleTodos}
          deleteTodoHandler={deleteTodoHandler}
          deletedTodosIds={deletedTodosIds}
          onToggleTodo={handleToggleTodo}
          handleChangeTodoTittle={handleChangeTodoTittle}
          selectedTodoId={selectedTodoIds}
          isAdding={isAdding}
          newTodoTitle={newTodoTitle}
        />

        <FilterTodoList
          setFilterType={setFilterType}
          filterType={filterType}
          todos={todos}
          clearAllHandler={clearAllHandler}
        />
      </div>

      {hasError && (
        <Erorr
          errorType={errorType}
          onRemoveErrorHandler={removeErorrHandler}
        />
      )}
    </div>
  );
};
