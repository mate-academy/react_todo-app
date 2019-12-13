import React, { Component } from 'react';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends Component {
  state = {
    todoList: [],
    id: 1,
    title: '',
    selectedPage: 'All',
  };

  changeInput = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  addTodo = (event) => {
    event.preventDefault();

    if (this.state.title.trim() === '') {
      return;
    }

    const newItem = {
      id: this.state.id,
      title: this.state.title,
      completed: false,
    };

    this.setState(state => ({
      ...state,
      todoList: [...state.todoList, newItem],
      id: state.id + 1,
      title: '',
    }));
  };

  removeTodo = (todoId) => {
    this.setState(state => ({
      ...state,
      todoList: [...state.todoList].filter(todo => (
        todo.id !== todoId
      )),
    }));
  };

  changeCompleted = (event) => {
    const todoId = +event.target.id;

    this.setState(state => ({
      ...state,
      todoList: state.todoList.map((todo) => {
        if (todoId === todo.id) {
          return {
            ...todo, completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  };

  todosFilter = (event) => {
    const page = event.target.innerText;

    this.setState({
      selectedPage: page,
    });
  };

  markAllAsComplete = () => {
    this.setState(state => ({
      ...state,
      todoList: state.todoList.map((todo) => {
        if (state.todoList.every(item => item.completed)) {
          return { ...todo, completed: false };
        }

        return { ...todo, completed: true };
      }),
    }));
  };

  clearCompleted = () => {
    this.setState(state => ({
      ...state,
      todoList: state.todoList.filter(todo => !todo.completed),
    }));
  };

  editTodo = (value, id) => {
    this.setState(state => ({
      ...state,
      todoList: state.todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: value };
        }

        return todo;
      }),
    }));
  };

  render() {
    const { todoList, selectedPage } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.addTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.changeInput}
              value={this.state.title}
            />
          </form>
        </header>

        <TodoList
          todoList={todoList}
          removeTodo={this.removeTodo}
          changeCompleted={this.changeCompleted}
          selectedPage={selectedPage}
          markAllAsComplete={this.markAllAsComplete}
          editTodo={this.editTodo}
        />

        <Footer
          todoList={todoList}
          selectedPage={selectedPage}
          todosFilter={this.todosFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
