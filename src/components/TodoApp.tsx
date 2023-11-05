import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { Main } from './Main';
import { Footer } from './Footer';
import { Header } from './Header';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <>
      <Header />

      {todos.length !== 0 && (
        <>
          <Main />
          <Footer />
        </>
      )}
    </>
  );
};
