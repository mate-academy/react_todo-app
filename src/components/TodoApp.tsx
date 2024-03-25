import { FC, useContext } from 'react';
import { StateContext } from '../lib/TodosContext';
import { Footer } from './Layout/Footer';
import { Header } from './Layout/Header';
import { Main } from './Layout/Main';

export const TodoApp: FC = () => {
  const { todos } = useContext(StateContext);

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
