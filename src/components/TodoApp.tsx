import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { TodosProvider } from './TodosContext';

export const TodoApp: React.FC = () => {
  return (
    <TodosProvider>
      <Header />
      <Main />
      <Footer />
    </TodosProvider>
  );
};
