import { Header } from './component/Header/Header';
import { TodoList } from './component/TodoList/TodoList';
import { Footer } from './component/Footer/Footer';
import { useContext } from 'react';
import { TodosContext } from './context/TodosContext';

export const App = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos && todos.length > 0 && <TodoList />}
        {todos && todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
