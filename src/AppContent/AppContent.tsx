import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TodoList } from '../components/TodoList';
import { useTodoContext } from '../TodoContext';

export const AppContent: React.FC = () => {
  const { todos } = useTodoContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />

        {todos.length !== 0 && <Footer />}
      </div>
    </div>
  );
};
