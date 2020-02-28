import React, { Component } from 'react';
import uuid from 'react-uuid';
import { TodoList } from './TodoList';
import { Footer } from './Footer/Footer';

class App extends Component {
  state = {
    todos: [],
    filtredTodos: 'all',
    active: 'all',
    title: '',
  }

  handleInputTodoChange = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
    });
  }

  handleAddTodo = (event) => {
    event.preventDefault();
    const { title } = this.state;
    let newTodo = {};

    this.setState((prevState) => {
      if (!title.trim()) {
        return {
          title: '',
        };
      }

      newTodo = {
        id: uuid(),
        title,
        completed: false,
      };

      return {
        todos: [
          ...prevState.todos,
          newTodo,
        ],
        id: '',
        title: '',
      };
    });
  }

  onToggleComplete = (currentTodo) => {
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
      active: filter,
    });
  }

  handleClearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(
        todo => !todo.completed,
      ),
    }));
  }

  toggleAllTodo = (event) => {
    const { checked } = event.target;

    this.setState((prevState) => {
      if (checked) {
        return {
          todos: prevState.todos.map(todo => (
            {
              ...todo,
              completed: true,
            }
          )),
        };
      }

      return {
        todos: prevState.todos.map(todo => (
          {
            ...todo,
            completed: false,
          }
        )),
      };
    });
  }

  todosLeftCount = () => {
    const todosLeftCount = this.state.todos.filter(
      todo => !todo.completed,
    );
    let todosLeftCountText = '';

    if (todosLeftCount.length === 1) {
      todosLeftCountText = `1 item left`;
    } else {
      todosLeftCountText = `${todosLeftCount.length} items left`;
    }

    return todosLeftCountText;
  }

  render() {
    const {
      todos,
      filtredTodos,
      active,
      title,
    } = this.state;

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
        <form onSubmit={this.handleAddTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleInputTodoChange}
            value={title}
          />
        </form>
        <TodoList
          todos={visibleTodo}
          onToggleComplete={this.onToggleComplete}
          onDelete={this.deleteTodo}
          toggleAllTodo={this.toggleAllTodo}
        />
        {this.state.todos.length > 0
        && (
          <Footer
            todosLeftCount={this.todosLeftCount}
            setFilter={this.setFilter}
            active={active}
            handleClearCompleted={this.handleClearCompleted}
          />
        )}
      </section>
    );
  }
}

export default App;
