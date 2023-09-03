import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { useTodos } from '../hooks/useTodo';

export const TodoApp = () => {
  const { todos } = useTodos();

  return (
    <div className="todoapp">
      <Header />
      <Main />

      {(!!todos.length) && (
        <Footer />
      )}
    </div>
  );
};
