/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { StateContext } from './components/Store';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  const [status, setStatus] = useState<Status>(Status.ALL);

  const filtredTodos = useMemo(() => {
    let list = todos;

    if (status === 'Active') {
      list = list.filter(todo => !todo.completed);
    } else if (status === 'Completed') {
      list = list.filter(todo => todo.completed);
    }

    return list;
  }, [status, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList todos={filtredTodos} />

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <TodoFooter status={status} onStatusChange={setStatus} />
        )}
      </div>
    </div>
  );
};
