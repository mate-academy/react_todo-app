import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    footerVisibility: false,
    allToggle: false,
    filterDescription: '',
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
      footerVisibility: true,
    }));
  };

  handleTodoToggle = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id !== todoId
          ? todo
          : { ...todo, completed: !todo.completed }
      )),
    }));
  };

  handleAllToggle = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        prevState.allToggle === false
          ? { ...todo, completed: true }
          : { ...todo, completed: false }
      )),
      allToggle: !prevState.allToggle,
    }));
  };

  handleDestroyTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  handleDestroyCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  handleFilter = (desc) => {
    this.setState((prevState) => {
      switch (desc) {
        case 'all':
          return ({
            filteredTodos: prevState.todos,
            filterDescription: desc,
          });

        case 'active':
          return ({
            filteredTodos: prevState.todos.filter(todo => !todo.completed),
            filterDescription: desc,
          });

        case 'completed':
          return ({
            filteredTodos: prevState.todos.filter(todo => todo.completed),
            filterDescription: desc,
          });

        default:
          return ({});
      }
    });
  };

  render() {
    const {
      todos,
      footerVisibility,
      filteredTodos,
      filterDescription,
    } = this.state;

    return (
      <section className="todoapp">

        <Header
          todos={todos}
          addTodo={this.addTodo}
        />

        <TodoList
          todos={todos}
          filteredTodos={filteredTodos}
          filterDescription={filterDescription}
          handleTodoToggle={this.handleTodoToggle}
          handleAllToggle={this.handleAllToggle}
          handleDestroyTodo={this.handleDestroyTodo}
        />

        {footerVisibility && (

          <Footer
            todos={todos}
            handleDestroyCompleted={this.handleDestroyCompleted}
            handleFilter={this.handleFilter}
          />

        )}
      </section>
    );
  }
}

export default App;
