/* eslint-disable jsx-a11y/control-has-associated-label */

import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useTodo } from './context/TodoContext';

export const App: React.FC = () => {
  const { state } = useTodo();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList />
        {state.todos.length !== 0 && <Footer />}
      </div>
    </div>
  );
};
