import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { getTodoToggle, getAllToggle } from './utils';

class App extends React.Component {
  state = {
    todos: [],
    allToggle: false,
    filterDescription: '',
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  handleTodoToggle = (todoId) => {
    this.setState(prevState => ({
      todos: getTodoToggle(prevState.todos, todoId),
    }));
  };

  handleAllToggle = () => {
    this.setState(prevState => ({
      allToggle: !prevState.allToggle,
      todos: getAllToggle(prevState.todos, prevState.allToggle),
    }));
  };

  handleDestroyTodo = (todoId) => {
    this.setState(prevState => ({
      allToggle: !prevState.todos.length === 0,
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  handleDestroyCompleted = () => {
    this.setState(prevState => ({
      allToggle: !prevState.todos.length === 0,
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  handleFilter = (desc) => {
    this.setState({
      filterDescription: desc,
    });
  };

  filteringTodos = (desc) => {
    const { todos } = this.state;
    
    switch (desc) {
      case 'active':
        return [...todos].filter(todo => !todo.completed);

      case 'completed':
        return [...todos].filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  handleChangeTodo = (title, id) => {
    this.setState(prevState => ({
      filteredTodos: prevState.filteredTodos.map(todo => (
        todo.id !== id
          ? todo
          : { ...todo, title }
      )),
      todos: prevState.todos.map(todo => (
        todo.id !== id
          ? todo
          : { ...todo, title }
      )),
    }));
  };

  render() {
    const {
      allToggle,
      filterDescription,
    } = this.state;

    const filteredTodos = this.filteringTodos(filterDescription);

    return (
      <section className="todoapp">

        <Header
          todos={filteredTodos}
          addTodo={this.addTodo}
        />

        <TodoList
          todos={filteredTodos}
          allToggle={allToggle}
          filterDescription={filterDescription}
          handleTodoToggle={this.handleTodoToggle}
          handleAllToggle={this.handleAllToggle}
          handleDestroyTodo={this.handleDestroyTodo}
          onChangeSubmit={this.handleChangeTodo}
        />

        {filteredTodos.length > 0 && (

          <Footer
            todos={filteredTodos}
            handleDestroyCompleted={this.handleDestroyCompleted}
            handleFilter={this.handleFilter}
          />

        )}
      </section>
    );
  }
}

export default App;
