import React from 'react';

import Footer from './Footer';
import TodoList from './TodosList';
import AddTodo from './AddTodo';

class App extends React.Component {
  state = {
    todos: [],
  }

  componentDidMount() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
      if (savedTodos){
        this.setState({todos: savedTodos});
      }
  }

  componentDidUpdate(prevState) {
    if (prevState.todos !== this.state.todos){
      this.saveToLocalStorage();
    }
  }

  handleTodoAdd = (newTodo) => {
    this.setState(prevState => ({
      todos: [ newTodo, ...prevState.todos]
    }));
  }

  handleTodoDelete = (todoId) => {
    this.setState({
        todos: this.state.todos.filter(todo => todo.id !== todoId)
    });
  }

  saveToLocalStorage() {
    const todos = JSON.stringify(this.state.todos);
    localStorage.setItem('todos', todos);
  }

  render () {
    return (
      <section className="todoapp">
       <header className="header">
        <h1>todos</h1>
        </header>

        <AddTodo
          handleTodoAdd={this.handleTodoAdd}
          todos={this.todos}
        />

        <TodoList
          todos={this.state.todos}
          handleTodoDelete={this.handleTodoDelete}
        />

        <Footer length={this.state.todos.length} />

      </section>
    );
  }
}

export default App;
