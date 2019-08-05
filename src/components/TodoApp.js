import React from 'react';
import TodoList from './TodoList';
import Header from './Header';
import Footer from './Footer';

class TodoApp extends React.Component {
  state = {
    todos: [],
    newTodo: { title: '' },
    sortField: 'all',
  }

  addTodo = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      todos: [...prevState.todos, prevState.newTodo],
      newTodo: { title: '' },
    }));
  }

  getTodo = (event) => {
    const title = event.target.value,
      id = Math.floor(Math.random() * Math.floor(1000)),
      newTodo = { id, title, completed: false };

    event.preventDefault();
    this.setState({
      newTodo,
    });
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  clearCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  handleToggle = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      )),
    }));
  };

  handleToggleAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        { ...todo, completed: true }
      )),
    }));
  };

  handleFilter = (filterBy) => {
    this.setState({
      filterBy,
    });
  };

  setFilteredTodos = (filterBy) => {
    const { todos } = this.state;

    switch (filterBy) {
      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  render() {
    console.log(this.state.todos)
    const filteredTodos = this.setFilteredTodos(this.state.filterBy);

    return (
      <section className="todoapp">
        <Header title={this.state.newTodo.title} addTodo={this.addTodo} getTodo={this.getTodo} />
        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" onChange={this.handleToggleAll} />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList todos={filteredTodos} handleToggle={this.handleToggle} deleteTodo={this.deleteTodo} />
        </section>
        <Footer todos={this.state.todos} handleFilter={this.handleFilter} clearCompletedTodos={this.clearCompletedTodos} />
      </section>

    );
  }
}

export default TodoApp;
