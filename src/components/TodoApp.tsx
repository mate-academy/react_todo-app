import React, { useContext, useState } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { TodosContext } from './TodosContext';
import { Status } from '../types/status';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const uncompletedTodosCount = todos.filter((todo) => !todo.completed).length;
  const [filterStatus, setFilterStatus] = useState(Status.All);

  const handleChangeStatus = (status: Status) => {
    setFilterStatus(status);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <Header />
      <Main filteredTodos={filteredTodos} />
      <Footer
        count={uncompletedTodosCount}
        currentStatus={filterStatus}
        onChange={handleChangeStatus}
      />
    </div>
  );
};
