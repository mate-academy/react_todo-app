import React, { useContext } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodosContext } from './Store';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const toggleAll = () => {
    setTodos(prevState => {
      const isAllTodosCompleted = prevState
        .every(({ completed }) => completed === true);

      if (isAllTodosCompleted) {
        return prevState.map((todo) => ({ ...todo, completed: false }));
      }

      return prevState.map((todo) => ({ ...todo, completed: true }));
    });
  };

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <>
          <TodoList items={todos} toggleAll={toggleAll} />
          <Footer />
        </>
      )}
    </div>
  );
};
