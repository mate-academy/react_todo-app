/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Footer } from './components/Footer';
import { SelectedFilter } from './types/SelectedFilter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ErrorSection } from './components/ErrorSection';
import { initialErrorMessage } from './constants/initialErrorMessage';
import { TodosContext } from './context/TodosContext';

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>(
    SelectedFilter.all,
  );
  const [editingTitle, setEditingTitle] = useState<number>(0);

  const { todos } = useContext(TodosContext);

  const visibleTodos = todos.filter(todo => {
    switch (selectedFilter) {
      case SelectedFilter.all:
        return true;

      case SelectedFilter.active:
        return !todo.completed;

      case SelectedFilter.completed:
        return todo.completed;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          visibleTodos={visibleTodos}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          editingTitle={editingTitle}
        />

        <TodoList
          visibleTodos={visibleTodos}
          editingTitle={editingTitle}
          setEditingTitle={setEditingTitle}
        />

        <Footer
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </div>

      <ErrorSection
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
