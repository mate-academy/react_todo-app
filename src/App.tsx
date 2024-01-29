/* eslint-disable jsx-a11y/control-has-associated-label */
// import { useState } from 'react';
import { TodoApp } from './components/TodoApp';
// import { TodosFilter } from './components/TodosFilter';
// import { Status } from './types/status';

export const App = () => {
  // const [filterStatus, setFilterStatus] = useState(Status.All);

  // const handleChangeStatus = (status: Status) => {
  //   setFilterStatus(status);
  // };

  return (
    <div className="App">
      <TodoApp />
      {/* <TodosFilter currentStatus={filterStatus} onChange={handleChangeStatus} /> */}
    </div>
  );
};
