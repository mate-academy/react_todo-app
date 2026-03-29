/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useRef } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodosContext } from './types/todoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const headerInputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    headerInputRef.current?.focus();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={headerInputRef} />

        {todos.length > 0 && (
          <>
            <TodoList onAction={focusInput} />
            <Footer onAction={focusInput} />
          </>
        )}
      </div>
    </div>
  );
};
