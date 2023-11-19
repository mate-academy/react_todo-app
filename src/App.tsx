import React, { useContext, useMemo } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Status, TodosContext } from './Store';

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
    visibleTodoApp,
    setVisibleTodoApp,
    todosStatus,
  } = useContext(TodosContext);

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

  const clearCompleted = () => {
    setTodos(prevState => {
      const filteredTodos = prevState.filter(({ completed }) => !completed);

      if (filteredTodos.length === 0) {
        setVisibleTodoApp(false);
      }

      return filteredTodos;
    });
  };

  const filteredTodos = useMemo(() => {
    switch (todosStatus) {
      case Status.Active:
        return todos.filter(({ completed }) => !completed);
      case Status.Completed:
        return todos.filter(({ completed }) => completed);
      default:
        return todos;
    }
  }, [todos, todosStatus]);

  return (
    <div className="todoapp">
      <Header />

      {visibleTodoApp && (
        <>
          <TodoList items={filteredTodos} toggleAll={toggleAll} />
          <Footer clearCompleted={clearCompleted} />
        </>
      )}
    </div>
  );
};
