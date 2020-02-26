import React, { Component } from 'react';
import { TodoList } from './TodoList';
import { AddNewTodo } from './AddNewTodo';
import { Footer } from './Footer/Footer';

class App extends Component {
  state = {
    todos: [],
    filtredTodos: 'all',
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  };

  onToogleComplete = (currentTodo) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === currentTodo.id
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo)),
    }));
  }

  deleteTodo = (currentTodo) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(
        todo => todo.id !== currentTodo.id,
      ),
    }));
  };

  setFilter = (filter) => {
    this.setState({
      filtredTodos: filter,
    });
  }

  handleClearComplited = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(
        todo => !todo.completed,
      ),
    }));
  }

  toggleAllTodo = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        {
          ...todo,
          completed: !todo.completed,
        }
      )),
    }));
  }

  render() {
    const { todos, filtredTodos } = this.state;

    let visibleTodo;

    if (filtredTodos === 'all') {
      visibleTodo = todos;
    } else if (filtredTodos === 'active') {
      visibleTodo = todos.filter(
        todo => !todo.completed,
      );
    } else if (filtredTodos === 'completed') {
      visibleTodo = todos.filter(
        todo => todo.completed,
      );
    }

    return (
      <section className="todoapp">
        <AddNewTodo
          onAdd={this.addTodo}
        />
        <TodoList
          todos={visibleTodo}
          onToogleComplete={this.onToogleComplete}
          onDelete={this.deleteTodo}
          toggleAllTodo={this.toggleAllTodo}
        />
        {!this.state.todos.length
        || (
          <Footer
            todos={visibleTodo}
            setFilter={this.setFilter}
            handleClearComplited={this.handleClearComplited}
          />
        )}
      </section>
    );
  }
}

export default App;
