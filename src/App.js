import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import todosFromServer from './api/todos';

const isTodoChanged = (todo, id) => {
  if (todo.id === id) {
    return {
      ...todo,
      completed: !todo.completed,
    };
  }

  return todo;
};

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

  onTodoStatus = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .map(todo => isTodoChanged(todo, id)),
    }));
  };

  onTodoStatusAll = (event) => {
    const { target: { checked } } = event;

    this.setState(prevState => ({
      todos: prevState.todos
        .map(todo => (
          {
            ...todo,
            completed: checked,
          }
        )),
    }));
  };

  render() {
    return (
      <TodoApp
        todos={this.state.todos}
        onStatus={this.onTodoStatus}
        onStatusAll={this.onTodoStatusAll}
      />
    );
  }
}

export default App;
