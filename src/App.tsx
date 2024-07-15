/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { SelectedStatus } from './types/SelectedTypes';
import { TodoContext } from './components/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [selectedStatus, setSelectedStatus] = useState(SelectedStatus.all);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleSetStatus = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    setSelectedStatus(target.textContent as SelectedStatus);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={inputRef} />

        <TodoList todoStatus={selectedStatus} />

        <Footer
          selectedStatus={selectedStatus}
          setTodoStatus={handleSetStatus}
        />
      </div>
    </div>
  );
};
