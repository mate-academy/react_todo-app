import React, { Component } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

class App extends Component {
  state = {
    todos: [],
    counter: 1,
    typeOfFilter: '',
  };

  newTodo = (title, id) => {
    const currentTodo = {
      id,
      title,
      completed: false,
    };

    this.setState(prev => ({
      todos: [
        ...prev.todos,
        currentTodo,
      ],
      counter: prev.counter + 1,
    }));
  };

  deleteTodo = (id) => {
    this.setState(prev => ({
      todos: prev.todos.filter(item => item.id !== id),
    }));
  };

  completedTodo = (id) => {
    this.setState(prev => ({
      todos: prev.todos.map((item) => {
        if (item.id === id) {
          return {
            ...item, completed: !item.completed,
          };
        }

        return item;
      }),
    }));
  };

  clearCompleted = () => {
    this.setState(prev => ({
      todos: prev.todos.filter(item => item.completed === false),
    }));
  };

  handleTypeOfFilter = (type) => {
    this.setState({
      typeOfFilter: type,
    });
  };

  render() {
    const { todos, typeOfFilter } = this.state;
    let visibleTodos = [...todos];

    if (typeOfFilter === 'completed') {
      visibleTodos = todos.filter(todo => todo.completed);
    }

    if (typeOfFilter === 'active') {
      visibleTodos = todos.filter(todo => !todo.completed);
    }

    return (
      <section className="todoapp">
        <Header
          todos={todos}
          newTodo={this.newTodo}
          id={this.state.counter}
        />
        <TodoList
          visibleTodos={visibleTodos}
          deleteTodo={this.deleteTodo}
          completedTodo={this.completedTodo}
        />
        <Footer
          invisibleFooter={todos.length}
          countCompleted={todos.filter(item => item.completed === false).length}
          handleTypeOfFilter={this.handleTypeOfFilter}
          typeOfFilter={typeOfFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
