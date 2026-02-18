import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { useTodoContext } from './context/TodoContext';
import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';

const TodoApp: React.FC = () => {
  const { todos, filteredTodos } = useTodoContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
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

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
