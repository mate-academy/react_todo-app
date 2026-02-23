/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { ErrorMsg } from './components/ErrorMsg';
import { TodosProvider, useTodos } from './context/TodosContext';
import { USER_ID } from './api/todos';

const AppInner: React.FC = () => {
  const { mode, setMode, error, setError } = useTodos();

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <label style={{ fontSize: 12 }}>
          <input
            type="radio"
            name="mode"
            checked={mode === 'api'}
            onChange={() => setMode('api')}
          />{' '}
          API
        </label>
        <label style={{ fontSize: 12 }}>
          <input
            type="radio"
            name="mode"
            checked={mode === 'local'}
            onChange={() => setMode('local')}
          />{' '}
          Local storage
        </label>
      </div>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList />
      </div>
      <ErrorMsg message={error} setError={setError} />
    </div>
  );
};

export const App: React.FC = () => (
  <TodosProvider>
    <AppInner />
  </TodosProvider>
);
