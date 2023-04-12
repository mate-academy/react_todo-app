/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useCallback } from 'react';
import {
  Box,
} from '@mui/material';
import { Todo } from './types/Todo';
import { Error } from './types/Error';
import { Notification } from './components/Notification';
import { useLocalStorage } from './utils/hooks';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<Error>(Error.None);
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useLocalStorage('todos');

  const removeError = () => {
    setErrorMessage(Error.None);
  };

  const showError = useCallback((errorType: Error) => {
    setErrorMessage(errorType);
    setTimeout(() => {
      removeError();
    }, 3000);
  }, []);

  const removeTodo = (id: number) => {
    setTodos.remove([id]);
  };

  const removeCompleted = () => {
    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    setTodos.remove(completedIds);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (query.trim()) {
      setTodos.add({
        id: Date.now(),
        title: query,
        completed: false,
      });
      setQuery('');

      return;
    }

    showError(Error.Title);
  };

  const handleUpdate = (id: number, data: Partial<Todo>) => {
    setTodos.toggle([id], data);
  };

  const handleToggleAll = () => {
    const areAllDone = todos.every(todo => todo.completed);
    let ids = [];
    let data = {};

    if (areAllDone) {
      ids = todos.map(el => el.id);
      data = { completed: false };
    } else {
      ids = todos
        .filter(el => !el.completed)
        .map(el => el.id);
      data = { completed: true };
    }

    setTodos.toggle(ids, data);
  };

  const remainingTodos = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
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
        />

        <TodoFilter
          onRemoveCompleted={removeCompleted}
          completedTodos={completedTodos}
        />

        <TodoList
          todos={todos}
          onDelete={removeTodo}
          onUpdateTodo={handleUpdate}
        />
      </Box>

      <Notification error={errorMessage} onDelete={removeError} />
    </div>
  );
};
