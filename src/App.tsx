import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { useTodos } from './helpers/useTodos';
import { TodoList } from './components/TodoList';
import { filterTodos } from './helpers/filterTodos';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, addTodo, removeTodo, toggleTodo] = useTodos();

  const completedTodosCounter = useMemo(() => {
    return todos.reduce((acc, curr) => {
      return curr.completed ? acc + 1 : acc;
    }, 0);
  }, [todos]);

  const { pathname: location } = useLocation();

  const hasCompletedTodo = useMemo(() => {
    return !todos.some(({ completed }) => completed === false);
  }, [todos]);

  const visibleTodos = filterTodos(todos, location);

  return (
    <div className="todoapp">
      <Header addTodo={addTodo} />

      {!!todos.length && (
        <>
          <TodoList
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            hasCompletedTodo={hasCompletedTodo}
            todos={visibleTodos}
          />

          <Footer
            completedTodosCounter={completedTodosCounter}
            todos={todos}
            removeTodo={removeTodo}
          />
        </>
      )}
    </div>
  );
};
