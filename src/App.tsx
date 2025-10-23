/* eslint no-console: ["error", { allow: ["warn", "log"] }] */

import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, deleteTodo, editTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { PayloadProps } from './types/PayloadProps';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const countActive = todos.filter(todo => todo.completed === false).length;
  const completedTodos = todos.filter(todo => todo.completed === true);
  const allCompleted = todos.length === completedTodos.length;
  const newTodoInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    newTodoInput.current?.focus();
  }, [isAdding, loadingIds]);

  useEffect(() => {
    setTimeout(() => {
      if (showError) {
        setShowError(false);
      }
    }, 3000);
  }, [showError]);

  const loadTodos = () => {
    setErrorMessage('');
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setShowError(true);
      });
  };

  useEffect(loadTodos, []);
  useEffect(() => {
    switch (filter) {
      case 'all':
        setVisibleTodos(todos);
        break;
      case 'active':
        setVisibleTodos(todos.filter(todo => todo.completed === false));
        break;
      case 'completed':
        setVisibleTodos(todos.filter(todo => todo.completed === true));
        break;
    }
  }, [todos, filter]);

  const filterTodos = (param: Filter) => {
    setFilter(param);
  };

  const removeTodo = async (todoId: number) => {
    setErrorMessage('');
    setLoadingIds(current => [...current, todoId]);

    try {
      await deleteTodo(todoId);
      const newTodos = todos.filter(todo => todo.id !== todoId);

      setTodos(newTodos);
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      setShowError(true);
      throw error;
    } finally {
      setLoadingIds([]);
    }
  };

  const clearCompleted = async () => {
    const promises: Promise<number>[] = [];

    completedTodos.forEach(todo => {
      promises.push(deleteTodo(todo.id));
      setLoadingIds(current => [...current, todo.id]);
    });

    const results = await Promise.allSettled(promises);

    const hasError = results.some(result => result.status === 'rejected');

    if (hasError) {
      setErrorMessage('Unable to delete a todo');
      setShowError(true);
    }

    const successfulIds = completedTodos
      .filter((_, i) => results[i].status === 'fulfilled')
      .map(todo => todo.id);

    setTodos(prev => prev.filter(todo => !successfulIds.includes(todo.id)));
    setLoadingIds([]);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    setIsAdding(true);
    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      setErrorMessage('Title should not be empty');
      setShowError(true);
      setIsAdding(false);

      return;
    }

    const newTodo = {
      id: 0,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setTempTodo(newTodo);

    addTodo(trimmedTitle)
      .then(savedTodo => {
        setTodos(current => [...current, savedTodo]);
        setTodoTitle('');
      })
      .catch(() => {
        setTempTodo(null);
        setErrorMessage('Unable to add a todo');
        setShowError(true);
      })
      .finally(() => {
        setTempTodo(null);
        setIsAdding(false);
      });
  };

  const updateTodo = async (id: number, payload: PayloadProps) => {
    setErrorMessage('');
    setLoadingIds(current => [...current, id]);

    try {
      const editedTodo = await editTodo(id, payload);
      const updatedTodos = todos.map(todo =>
        todo.id === id ? editedTodo : todo,
      );

      setTodos(updatedTodos);
    } catch (error) {
      setErrorMessage('Unable to update a todo');
      setShowError(true);
      throw error;
    } finally {
      setLoadingIds([]);
    }
  };

  const handleToggleAll = async () => {
    const promises: Promise<Todo>[] = [];
    let proceedTodos: Todo[] = [];
    let completed = false;

    if (allCompleted) {
      proceedTodos = todos;
    } else {
      proceedTodos = todos.filter(todo => !todo.completed);
      completed = true;
    }

    proceedTodos.forEach(todo => {
      promises.push(editTodo(todo.id, { completed }));
      setLoadingIds(current => [...current, todo.id]);
    });

    const results = await Promise.allSettled(promises);

    const hasError = results.some(result => result.status === 'rejected');

    if (hasError) {
      setErrorMessage('Unable to update a todo');
      setShowError(true);
    }

    const successfulIds = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value.id);

    const newTodos = todos.map(todo => {
      if (successfulIds.includes(todo.id)) {
        return { ...todo, completed };
      }

      return todo;
    });

    setTodos(newTodos);
    setLoadingIds([]);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isToggleAllVisible={todos.length > 0}
          inputRef={newTodoInput}
          inputDisable={isAdding}
          todoTitle={todoTitle}
          handleInputChange={event => setTodoTitle(event.target.value)}
          handleSubmit={handleSubmit}
          allCompleted={allCompleted}
          handleToggleAll={handleToggleAll}
        />
        {visibleTodos.length > 0 && (
          <TodoList
            visibleTodos={visibleTodos}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            loadingIds={loadingIds}
          />
        )}

        {tempTodo && <TodoItem todo={tempTodo} />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            countActive={countActive}
            filter={filter}
            filterTodos={filterTodos}
            clearCompleted={clearCompleted}
            isClearDisable={completedTodos.length === 0}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        showError={showError}
        setShowError={setShowError}
      />
    </div>
  );
};
