/* eslint-disable jsx-a11y/control-has-associated-label */
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { useContext } from 'react';
import { TodoContext } from './context/TodoContext';
import { TodoContextType } from './types/types';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext) as TodoContextType;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
