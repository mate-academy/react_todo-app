import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { TodosProvider } from './context/TodosContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <Header />

        <Main />

        <Footer />
      </TodosProvider>
    </div>
  );
};
