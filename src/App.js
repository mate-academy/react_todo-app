import React from 'react';
import { CreateNewTodo } from './components/CreateNewTodo/CreateNewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { Filters } from './components/Filters/Filters';

class App extends React.Component {
  state = {
    todos: [],
    filter: 'all',
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (
        todo.id !== id
      )),
    }));
  }

  completedTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        (todo.id === id)
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )),
    }));
  }

  toggleCompletedAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      })),
    }));
  }

  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  }

  setFilter = () => {
    const { todos, filter } = this.state;

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todos, filter } = this.state;

    return (
      <section className="todoapp">
        <CreateNewTodo addTodo={this.addTodo} />
        <TodoList
          deleteTodo={this.deleteTodo}
          completedTodo={this.completedTodo}
          toggleCompletedAll={this.toggleCompletedAll}
          todos={this.setFilter()}
        />
        <Filters
          todos={todos}
          filter={filter}
          handleFilter={this.handleFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
