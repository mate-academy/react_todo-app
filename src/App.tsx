import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { useLocalStorage } from './helpers/useLocalStorage';
import { TodoList } from './components/TodoList';
import { filterTodos } from './helpers/filterTodos';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos');

  const completedTodosCounter = useMemo(() => {
    return todos.reduce((acc, curr) => {
      return curr.completed ? acc + 1 : acc;
    }, 0);
  }, [todos]);

  const { pathname: location } = useLocation();

  const someCompletedTodo = useMemo(() => {
    return !todos.some(({ completed }) => completed === false);
  }, [todos]);

  const visibleTodos = filterTodos(todos, location);

  return (
    <div className="todoapp">
      <Header setTodos={setTodos} />

      {!!todos.length && (
        <>
          <TodoList
            someCompletedTodo={someCompletedTodo}
            todos={visibleTodos}
            setTodos={setTodos}
          />

          <Footer
            completedTodosCounter={completedTodosCounter}
            todos={todos}
            setTodos={setTodos}
          />
        </>
      )}
    </div>
  );
};
