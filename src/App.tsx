import { useContext } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoContext, TodoProvider } from './components/Context/TodoContext';
import { TodoList } from './components/TodoList/TodoList';

const TodoApp = () => {
  const context = useContext(TodoContext);

  if (!context) {
    return null;
  }

  const hasTodos = context.state.todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {hasTodos && (
          <>
            <TodoList />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export const App = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
