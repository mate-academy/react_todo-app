import React, { useEffect } from 'react';
import { TodoProvider } from './context/TodoContext';
import { useTodoContext } from './context/TodoContext';
import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';

const TodoApp: React.FC = () => {
  const { todos, filteredTodos, deletingTodos, errorMessage, setErrorMessage } =
    useTodoContext();

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timer);
  }, [errorMessage, setErrorMessage]);

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
              {deletingTodos.map(todo => (
                <TodoItem key={`deleting-${todo.id}`} todo={todo} isDeleting />
              ))}
            </section>

            <Footer />
          </>
        )}

        <p
          data-cy="ErrorNotification"
          className={`notification ${errorMessage ? '' : 'hidden'}`}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {errorMessage}
        </p>
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
