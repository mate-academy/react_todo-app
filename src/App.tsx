/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoProvider } from './Components/TodoContext/TodoContext';
import { TodoList } from './Components/TodoList/TodoList';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          <TodoList />
          <Footer />
        </div>
      </div>
    </TodoProvider>
  );
};
