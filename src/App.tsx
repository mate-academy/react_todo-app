/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const context = useContext(TodoContext);

  if (!context) {
    return null;
  }

  const { todos } = context;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main filter={filter} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            setFilter={(f: 'all' | 'active' | 'completed') => setFilter(f)}
            filter={filter}
          />
        )}
      </div>
    </div>
  );
};
