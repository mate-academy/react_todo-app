/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { FILTERS, KEY_TODOS } from './utils/constants';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodosContext } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [filtredField, setFiltredField] = useState<FILTERS>(FILTERS.ALL);
  const inputRef = useRef<HTMLInputElement>(null);
  const completedCount = useMemo(
    () => todos.filter(t => t.completed).length,
    [todos],
  );

  useEffect(() => {
    inputRef.current?.focus();
    localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
  }, [todos]);

  const onFilter = (field: FILTERS) => {
    if (field === filtredField) {
      return;
    }

    setFiltredField(field);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header completedCount={completedCount} ref={inputRef} />

        <TodoList filtredField={filtredField} />

        {todos.length > 0 && (
          <Footer
            completedCount={completedCount}
            filtredField={filtredField}
            onFilter={onFilter}
          />
        )}
      </div>
    </div>
  );
};
