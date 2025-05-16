import React from 'react';
import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';
import { useTodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos, visibleTodos } = useTodoContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};
