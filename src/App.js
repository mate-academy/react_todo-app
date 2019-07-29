import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { getTodoToggle, getAllToggle } from './utils';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    allToggle: false,
    filterDescription: '',
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      filteredTodos: [...prevState.filteredTodos, todo],
      todos: [...prevState.todos, todo],
    }));
  };

  handleTodoToggle = (todoId) => {
    this.setState(prevState => ({
      filteredTodos: getTodoToggle(prevState.filteredTodos, todoId),
      todos: getTodoToggle(prevState.todos, todoId),
    }));
  };

  handleAllToggle = () => {
    this.setState(prevState => ({
      filteredTodos: getAllToggle(prevState.filteredTodos, prevState.allToggle),
      allToggle: !prevState.allToggle,
      todos: getAllToggle(prevState.todos, prevState.allToggle),
    }));
  };

  handleDestroyTodo = (todoId) => {
    this.setState(prevState => ({
      filteredTodos: prevState.filteredTodos.filter(todo => todo.id !== todoId),
      allToggle: !prevState.todos.length === 0,
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  handleDestroyCompleted = () => {
    this.setState(prevState => ({
      filteredTodos: prevState.filteredTodos.filter(todo => !todo.completed),
      allToggle: !prevState.todos.length === 0,
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  handleFilter = (desc) => {
    this.setState((prevState) => {
      switch (desc) {
        case 'active':
          return ({
            filteredTodos: prevState.todos.filter(todo => !todo.completed),
          });

        case 'completed':
          return ({
            filteredTodos: prevState.todos.filter(todo => todo.completed),
          });

        default:
          return ({
            filteredTodos: prevState.todos,
          });
      }
    });
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
      todos,
      filteredTodos,
      allToggle,
      filterDescription,
    } = this.state;

    return (
      <section className="todoapp">

        <Header
          todos={filteredTodos}
          addTodo={this.addTodo}
        />

        <TodoList
          todos={filteredTodos}
          allToggle={allToggle}
          filteredTodos={filteredTodos}
          filterDescription={filterDescription}
          handleTodoToggle={this.handleTodoToggle}
          handleAllToggle={this.handleAllToggle}
          handleDestroyTodo={this.handleDestroyTodo}
          onChangeSubmit={this.handleChangeTodo}
        />

        {todos.length > 0 && (

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
