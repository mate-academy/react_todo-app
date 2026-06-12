import React from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { useTodos } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos, errorMessage, setErrorMessage } = useTodos();

  const hasTodos = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {hasTodos && (
          <>
            <TodoList />
            <TodoFooter />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification ${errorMessage ? '' : 'hidden'}`}
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
          style={{
            position: 'absolute',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: 'inherit',
          }}
        >
          ✖
        </button>

        {errorMessage}
      </div>
    </div>
  );
};
