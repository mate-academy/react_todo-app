import { useContext, useMemo } from 'react';
import { StateContext } from '../../store/store';
import { Header } from '../Header/Header';
import { Main } from '../Main';
import { Footer } from '../Footer';

import './TodoApp.scss';

export const TodoApp = () => {
  const { todos } = useContext(StateContext);

  const isVisible = useMemo(() => {
    return !(todos.length === 0);
  }, [todos]);

  return (
    <div className="todoapp">
      <Header />

      {isVisible && (
        <>
          <Main />
          <Footer />
        </>
      )}
    </div>
  );
};
