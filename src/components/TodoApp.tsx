import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { TodoProvider } from './TodoContext';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoProvider>
        <Header />
        <Main />
        <Footer />
      </TodoProvider>
    </div>
  );
};
