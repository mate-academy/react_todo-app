import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { Header } from '../Header';
import { SectionMain } from '../SectionMain';
import { Footer } from '../Footer';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <>
      <Header />
      { todos.length > 0 && (
        <>
          <SectionMain />
          <Footer />
        </>
      )}
    </>
  );
};
