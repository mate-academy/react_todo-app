/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { TodoStatus } from './types/TodoStatus';
import { TodoContext, TodoProvider } from './Contexts/TodoContext';

export const App: React.FC = () => {
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.all);

  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          <TodoList status={status} />

          {/* Hide the footer if there are no todos */}
          <TodoContext.Consumer>
            {({ todos }) =>
              !!todos.length && <Footer status={status} setStatus={setStatus} />
            }
          </TodoContext.Consumer>
        </div>
      </div>
    </TodoProvider>
  );
};
