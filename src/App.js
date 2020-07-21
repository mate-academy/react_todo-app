import React from 'react';

import tasksFromServer from './api/tasks.json';
import { TodoApp } from './components/TodoApp/TodoApp';

const App = () => (
  <TodoApp tasksFromServer={tasksFromServer} />
);

export default App;
