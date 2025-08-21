import React from 'react';
import { TodosProvider } from './context/TodosContext';
import { useHashFilter } from './hooks/useHashFilter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const TodoApp: React.FC = () => {
  const filter = useHashFilter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={inputRef} />
        <TodoList filter={filter} inputRef={inputRef} />
        <Footer filter={filter} inputRef={inputRef} />
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <TodosProvider>
    <TodoApp />
  </TodosProvider>
);
