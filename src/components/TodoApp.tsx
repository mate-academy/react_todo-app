import { useContext } from 'react';
import { TodosContext } from '../store/TodosContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';

export const TodoApp = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />
      {!!todos.length && (
        <>
          <Main />
          <Footer />
        </>
      )}
    </div>
  );
};
