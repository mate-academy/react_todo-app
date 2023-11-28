import React, { useContext, useState } from 'react';
import { TodoCreator } from './components/TodoCreator';
import { Status } from './types/Status';
import { TodosContext } from './components/TodosContext';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [status, setStatus] = useState<Status>(Status.All);
  const { todos } = useContext(TodosContext);

  const filtredTodo = todos.filter(({ completed }) => {
    switch (status) {
      case Status.Active:
        return !completed;
      case Status.Completed:
        return completed;
      default:
        return true;
    }
  }, [status]);

  return (
    <div className="todoapp">
      <TodoCreator />
      {!!todos.length && (
        <>
          <TodoList items={filtredTodo} />
          <TodoFilter status={status} onStatusChange={setStatus} />
        </>
      )}
    </div>
  );
};
