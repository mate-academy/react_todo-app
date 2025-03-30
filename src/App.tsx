/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoList } from './components/TodoList';
import { TodosContext } from './context/TodosContext';
import { FilteredTodosContext } from './context/FilteredTodosContext';
import { Footer } from './components/Foorer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const context = useContext(TodosContext);
  const filteredContext = useContext(FilteredTodosContext);

  if (!context || !filteredContext) {
    throw new Error('TodoList must be used within a TodosProvider');
  }

  const { todos } = context;
  const activeTodos = todos.filter(item => !item.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodos={activeTodos} />

        <section className="todoapp__main" data-cy="TodoList">
          {todos && <TodoList />}
        </section>

        {todos.length > 0 && <Footer activeTodos={activeTodos} />}
      </div>
    </div>
  );
};
