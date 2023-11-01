/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Section } from './Section';
import { FilterProvider } from '../FilterContext';
import { TodosContext } from '../TodosContext';

export const TodoApp: React.FC = () => {
  const todos = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <FilterProvider>
          <Section />
          <Footer />
        </FilterProvider>
      )}
    </div>
  );
};
