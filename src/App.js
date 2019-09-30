import React, { Component } from 'react';
import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {
    todos: [],
    activeTab: 'all',
    checkAll: true,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  toggleComplete  = id => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    }));
  };

  checkAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.checkAll,
      })),

      checkAll: !prevState.checkAll,
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  removeAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  updateActiveTab = (item) => {
    this.setState({
      activeTab: item,
    });
  };

  render() {
    const { todos, activeTab } = this.state;

    let todosShow = [];

    switch(activeTab) {
      case 'all':
        todosShow = todos;
        break;
      case 'active':
        todosShow = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        todosShow = todos.filter(todo => todo.completed);
        break;
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.checkAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todosShow}
            toggleComplete ={this.toggleComplete }
            deleteTodo={this.deleteTodo}
          />
        </section>

        <Footer
          todos={todos}
          removeAllCompleteTodos={this.removeAllCompleted}
          activeTab={activeTab}
          updateActiveTab={this.updateActiveTab}
        />
      </section>
    );
  }
}

export default App;
