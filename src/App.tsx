/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { filterTodos } from './helper/filterTodos';
import { useLocaleStorage } from './helper/useLocaleStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocaleStorage('todos');
  const amountCompletedTodos = useMemo(() => {
    return todos.reduce((acc, curr) => {
      return curr.completed ? acc + 1 : acc;
    }, 0);
  }, [todos]);
  const { pathname: location } = useLocation();
  const isCompletedTodo = useMemo(() => {
    return !todos.some(todo => todo.completed === false);
  }, [todos]);

  const visibleTodos = filterTodos(todos, location);

  return (
    <div className="todoapp">
      <Header
        setTodos={setTodos}
      />

      {!todos.length || (
        <>
          <TodoList
            isCompletedTodo={isCompletedTodo}
            todos={visibleTodos}
            setTodos={setTodos}
          />
          <Footer
            todos={todos}
            setTodos={setTodos}
            amountCompletedTodos={amountCompletedTodos}
          />
        </>
      )}
    </div>
  );
};
