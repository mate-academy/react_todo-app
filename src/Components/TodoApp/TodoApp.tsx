import React, { useContext } from 'react';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { StateContext } from '../../Context/TodoContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <Header />

      {
        todos.length !== 0 && (
          <>
            <Main />

            <Footer />
          </>
        )
      }
    </div>
  );
};
