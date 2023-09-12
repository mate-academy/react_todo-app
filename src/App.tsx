/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import * as postService from './api/todos';
import { Todo } from './types/Todo';
import { TodoApp } from './components/TodoApp';
import { ErrorMessage } from './components/ErrorMessage';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Filter } from './types/Filter';

const USER_ID = 10876;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || ''),
  );
  const [filterType, setFilterType] = useState<Filter>(Filter.ALL);
  const [error, setError] = useState<string>('');
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [deleteTodoIds, setDeleteTodoIds] = useState([0]);
  const [updatedTodoIds, setUpdatedTodoIds] = useState([0]);
  const [isTodoLoaded, setIsTodoLoaded] = useState<boolean>(false);
  const [isTodoSaved, setIsTodoSaved] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (todos.length === 0) {
      postService.getTodos(USER_ID)
        .then((todosFromServer: Todo[]) => setTodos(todosFromServer))
        .catch(() => setError('Unable to get todos'));

      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, []);

  useEffect(() => {
    setIsTodoSaved(!!query && isTodoLoaded);
  }, [query, isTodoLoaded]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed), [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed), [todos],
  );

  const filteredTodos = {
    all: todos,
    active: activeTodos,
    completed: completedTodos,
  };

  const handleTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (selectedFilter: Filter) => {
    setFilterType(selectedFilter);
  };

  const handleErrorMessage = (message: string) => {
    setIsShowError(true);
    setError(message);

    setTimeout(() => {
      setIsShowError(false);
    }, 3000);
  };

  const addTodo = async (event: React.FormEvent, title: string) => {
    event.preventDefault();

    if (!title.trim()) {
      handleErrorMessage('Title can\'t be empty');
      setQuery('');

      return;
    }

    try {
      setIsTodoLoaded(true);

      const createdTodo = await postService.postTodo({
        title,
        userId: USER_ID,
        completed: false,
      });

      setTodos(prevTodos => [...prevTodos, createdTodo]);
    } catch {
      handleErrorMessage('Unable to add a todo');
    } finally {
      setIsTodoLoaded(false);
      setQuery('');
    }
  };

  const deleteTodo = async (currentId: number) => {
    try {
      setDeleteTodoIds(prevIds => [...prevIds, currentId]);
      await postService.deleteTodo(currentId);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== currentId));
    } catch {
      handleErrorMessage('Unable to delete a todo');
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      setUpdatedTodoIds(prevIds => [...prevIds, updatedTodo.id]);

      await postService.updateTodo(updatedTodo);

      const updatedTodosList = [...todos].map(todo => (
        todo.id !== updatedTodo.id ? todo : updatedTodo
      ));

      setTodos(updatedTodosList);
    } catch {
      handleErrorMessage('Unable to update a todo');
    } finally {
      setUpdatedTodoIds([0]);
    }
  };

  const handleClearCompleted = () => {
    completedTodos.forEach(todo => {
      deleteTodo(todo.id);
    });
  };

  const checkTodo = (selectedTodo: Todo, isCompleted?: boolean) => {
    updateTodo({
      ...selectedTodo,
      completed: isCompleted || !selectedTodo.completed,
    });
  };

  const handleToggleAll = () => {
    const allTodosCompleted = todos.every(todo => todo.completed);

    todos.forEach(todo => {
      if ((allTodosCompleted && todo.completed)
        || (!allTodosCompleted && !todo.completed)) {
        checkTodo(todo, !todo.completed);
      }
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: activeTodos.length === 0,
            })}
            onClick={handleToggleAll}
          />

          <TodoApp
            query={query}
            isTodoLoaded={isTodoLoaded}
            handleTodoInput={handleTodoInput}
            addTodo={addTodo}
          />
        </header>

        {todos.length > 0 && (
          <TodoList
            todos={filteredTodos[filterType]}
            deleteTodoIds={deleteTodoIds}
            updatedTodoIds={updatedTodoIds}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            checkTodo={checkTodo}
            isTodoSaved={isTodoSaved}
          />
        )}

        {todos.length > 0 && (
          <TodoFilter
            filterType={filterType}
            activeTodos={activeTodos}
            handleFilterChange={handleFilterChange}
            handleClearCompleted={handleClearCompleted}
            hideClearCompleted={completedTodos.length === 0}
          />
        )}
      </div>

      <ErrorMessage isShown={isShowError} errorContent={error} />
    </div>
  );
};
