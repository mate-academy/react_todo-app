/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodosContext } from './component/TodosContext';
import { SortType } from './component/types/types';
import { Footer } from './component/Footer';
import { TodoList } from './component/TodoList';
import { Header } from './component/Header';

export const App: React.FC = () => {
  const { todos, sorted } = useContext(TodosContext);

  const visibleTodos = (() => {
    switch (sorted) {
      case SortType.Active:
        return todos.filter(todo => !todo.completed);
      case SortType.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  })();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList visibleTodos={visibleTodos} />

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
