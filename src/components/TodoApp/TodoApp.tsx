import { useContext } from 'react';
import { TodosContext } from '../../stor/Context';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const isEmpty = todos.length <= 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isEmpty={isEmpty} />

        {!isEmpty && <Main />}
        {!isEmpty && <Footer />}
      </div>
    </div>
  );
};
