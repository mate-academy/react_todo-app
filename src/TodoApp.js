import React from 'react';
import TodoList from './TodoList';
import Footer from './Footer';

class TodoApp extends React.Component {
  state = {
    todos: [],
    inputValue: '',
    allCompleted: false,
    filterStatus: undefined,
  }

  addInputValue = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.inputValue) {
      return;
    }

    this.setState((state) => {
      const newTodo = {
        title: this.state.inputValue,
        id: +new Date(),
        completed: false,
      };

      return {
        todos: [...state.todos, newTodo],
        inputValue: '',
      };
    });
  }

  handleCompleted = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map(todo => (todo.id === todoId
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo
      )),
    }));
    this.setState(state => (
      { allCompleted: state.todos.every(todo => todo.completed) }
    ));
  }

  handleDelete = (todoId) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== todoId),
    }));
  }

  handleCompletedAll = () => {
    this.setState(state => ({
      allCompleted: !state.allCompleted,
      todos: state.todos.map(todo => ({
        ...todo, completed: !state.allCompleted,
      })),
    }));
  }

  handlerFilterAll = () => {
    this.setState({
      filterStatus: undefined,
    });
  }

  handlerFilterActive = () => {
    this.setState({
      filterStatus: false,
    });
  }

  handlerFilterCompleted = () => {
    this.setState({
      filterStatus: true,
    });
  }

  handlerClearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.addInputValue}
              value={this.state.inputValue}
              count={this.state.count}
            />
          </form>
        </header>
        <TodoList
          todos={this.state.todos.filter(
            todo => (this.state.filterStatus !== undefined
              ? this.state.filterStatus === todo.completed
              : true)
          )}
          handleCompleted={this.handleCompleted}
          handleCompletedAll={this.handleCompletedAll}
          allCompleted={this.state.allCompleted}
          handleDelete={this.handleDelete}
          handleEditing={this.handleEditing}
          edit={this.state.edit}
        />
        <Footer
          todos={this.state.todos}
          handlerFilterAll={this.handlerFilterAll}
          handlerFilterActive={this.handlerFilterActive}
          handlerFilterCompleted={this.handlerFilterCompleted}
          handlerClearCompleted={this.handlerClearCompleted}
        />
      </>
    );
  }
}

export default TodoApp;
