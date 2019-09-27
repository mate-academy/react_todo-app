import React, { Component } from 'react';
import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {
    todos: [],
    activeTab: 'all',
    allComplete: true,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  complete = id => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    }));
  };

  allComplete = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.allComplete,
      })),
      allComplete: !prevState.allComplete,
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  removeAllComplete = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  updateActiveTab = (string) => {
    this.setState({
      activeTab: string,
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
      default:
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
            onClick={this.allComplete}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todosShow}
            complete={this.complete}
            deleteTodo={this.deleteTodo}
          />
        </section>

        <Footer
          todos={todos}
          removeAllCompleteTodos={this.removeAllComplete}
          activeTab={activeTab}
          updateActiveTab={this.updateActiveTab}
        />
      </section>
    );
  }
}

export default App;
