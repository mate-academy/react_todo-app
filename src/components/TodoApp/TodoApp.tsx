import { useState, useEffect } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Section } from '../Section/Section';
import { useTodos } from '../TodosContext/TodosContext';

export const TodoApp = () => {
  const { todos } = useTodos();
  const [footerIsShown, setFooterIsShown] = useState(false);

  useEffect(() => {
    setFooterIsShown(todos.length > 0);
  }, [todos]);

  return (
    <div className="todoapp">
      <Header />

      <Section />

      {footerIsShown && <Footer />}
    </div>
  );
};
