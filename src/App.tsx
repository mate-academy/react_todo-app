import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';
// eslint-disable-next-line max-len
import { TodosContextProvider } from './components/controllers/todos/TodosContextProvider';

export const App: React.FC = () => {
  const [isTodosEmpty, setIsTodosEmpty] = useState(false);

  return (
    <TodosContextProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <div className="todoapp__content">
          <TodoHeader />
          <TodoList onChangeIsTodosEmpty={setIsTodosEmpty} />
          {isTodosEmpty && <TodoFooter />}
        </div>

        <ErrorNotification />
      </div>
    </TodosContextProvider>
  );
};
