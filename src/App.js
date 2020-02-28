import React, { Component } from 'react';
import uuid from 'react-uuid';
import { TodoList } from './TodoList';
import { Footer } from './Footer';

class App extends Component {
  state = {
    todos: [],
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

    this.setState((prevState) => {
      if (!title.trim()) {
        return {
          title: '',
        };
      }

      const newTodo = {
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

  onToggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === id
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo)),
    }));
  }

  toggleAllTodo = (event) => {
    const { checked } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        {
          ...todo,
          completed: checked,
        }
      )),
    }));
  };

  deleteTodo = (currentTodo) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(
        todo => todo.id !== currentTodo.id,
      ),
    }));
  };

  setFilter = (filter) => {
    this.setState({
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

  showActiveTodosCount = () => {
    const activeTodos = this.state.todos.filter(
      todo => !todo.completed,
    );
    const activeTodosCount = activeTodos.length === 1
      ? `1 item left`
      : `${activeTodos.length} items left`;

    return activeTodosCount;
  }

  showTodos = () => {
    const {
      todos,
      active,
    } = this.state;
    let visibleTodos = [];

    if (active === 'all') {
      visibleTodos = todos;
    } else if (active === 'active') {
      visibleTodos = todos.filter(
        todo => !todo.completed,
      );
    } else if (active === 'completed') {
      visibleTodos = todos.filter(
        todo => todo.completed,
      );
    }

    return visibleTodos;
  }

  isActiveTodo = () => {
    const activeTodos = this.state.todos.filter(
      todo => !todo.completed,
    );
    const isActiveTodos = !activeTodos.length;

    return isActiveTodos;
  }

  render() {
    const {
      active,
      title,
    } = this.state;

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
          todos={this.showTodos()}
          onToggleComplete={this.onToggleComplete}
          onDelete={this.deleteTodo}
          toggleAllTodo={this.toggleAllTodo}
          isActiveTodos={this.isActiveTodo()}
        />
        {this.state.todos.length > 0
        && (
          <Footer
            showActiveTodosCount={this.showActiveTodosCount()}
            setFilter={this.setFilter}
            activeTodos={active}
            handleClearCompleted={this.handleClearCompleted}
          />
        )}
      </section>
    );
  }
}

export default App;
