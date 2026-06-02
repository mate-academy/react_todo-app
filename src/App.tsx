import { useTodoState } from './hooks/useTodoState';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App = () => {
  const { hasTodos } = useTodoState();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {hasTodos && <Footer />}
      </div>
    </div>
  );
};
