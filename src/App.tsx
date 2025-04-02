/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo } from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoContext } from './context/TodoProvider';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const count = useMemo(() => {
    const completed = todos.filter(todo => todo.completed);
    const active = todos.filter(todo => !todo.completed);

    return {
      completed: completed.length,
      active: active.length,
      all: todos.length,
    };
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header count={count} />
      <div className="todoapp__content">
        <TodoList />
        {count.all > 0 && <Footer count={count} />}
      </div>
    </div>
  );
};
