/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { StateContext } from './context/global-context';
import { ToDo } from './components/todo';

export const App: React.FC = () => {
  const state = React.useContext(StateContext);
  const visibleTodos = state.todos.filter(todo => {
    if (state.filter === 'active') {
      return !todo.completed;
    }

    if (state.filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {state.todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <ToDo key={todo.id} todo={todo} />
              ))}
            </section>

            <Footer />
          </>
        )}
      </div>
    </div>
  );
};
