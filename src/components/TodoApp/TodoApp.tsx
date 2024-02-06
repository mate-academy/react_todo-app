import { useContext } from 'react';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import { TodosContext } from '../TodosContext';

type Props = {};

export const TodoApp: React.FC<Props> = () => {
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
