/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
} from 'react';
import { DispatchContext, TodosContext } from './state/State';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(TodosContext);

  useEffect(() => {
    dispatch({ type: 'loadFromStorage' });
  }, [dispatch]);

  return (
    <div className="todoapp">
      <Header />
      <Main />
      {!!todos.length && (
        <Footer />
      )}
    </div>
  );
};
