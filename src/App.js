import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import todosFromServer from './api/todos';

class App extends React.Component {
  state = {
    todos: [],
  }

  componentDidMount() {
    this.getTodosFromApi();
  }

  getTodosFromApi = () => {
    this.setState({
      todos: todosFromServer,
    });
  };

  render() {
    return (
      <TodoApp
        todos={this.state.todos}
      />
    );
  }
}

export default App;
