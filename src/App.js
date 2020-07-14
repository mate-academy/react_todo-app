import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import todosFromServer from './api/todos';

class App extends React.Component {
  state = {

  }

  render() {
    return (
      <TodoApp
        todos={todosFromServer}
      />
    );
  }
}

export default App;
