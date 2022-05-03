import React from 'react';
import { TodosProvider } from './components/TodosContext';
import { Header } from './components/Header';
import { SectionMain } from './components/SectionMain';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <TodosProvider>
      <section className="todoapp">
        <Header />
        <SectionMain />
        <Footer />
      </section>
    </TodosProvider>
  );
};

export default App;
