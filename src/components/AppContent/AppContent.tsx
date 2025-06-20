import { useTodoContext } from '../../store/useTodoContext';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { TodoList } from '../TodoList';

type Props = {};

export const AppContent: React.FC<Props> = () => {
  const { isThereAlLeastOneTodo } = useTodoContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList />
        {isThereAlLeastOneTodo && <Footer />}
      </div>
    </div>
  );
};
