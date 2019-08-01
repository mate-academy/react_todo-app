import React from 'react';

import Footer from './Footer';
import TodoList from './TodosList';
import AddTodo from './AddTodo';

class App extends React.Component {
  state = {
    todos: [],
    activeFilter: 'all',
  };

  componentDidMount() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
      if (savedTodos){
        this.setState({todos: savedTodos});
      }
  };

  componentDidUpdate(prevState) {
    if (prevState.todos !== this.state.todos){
      this.saveToLocalStorage();
    }
  };

  handleTodoAdd = (newTodo) => {
    this.setState(prevState => ({
      todos: [ newTodo, ...prevState.todos]
    }));
  };

  handleTodoDelete = (todoId) => {
    this.setState({
        todos: this.state.todos.filter(todo => todo.id !== todoId)
    });
  };

  handleTodoDeleteCompleted = (todoCompleted) => {
    this.setState({
        todos: this.state.todos.filter(todo => todo.completed === !todoCompleted)
    });
  };

  handleToggleCompleting = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id !== id) {
          return todo;
  }
      return {
        ...todo,
        completed: !todo.completed,
      };
      }),
    }));
  };

  handleToggleCompletingAll = () => {
    this.setState((prevState) => {
      if (prevState.todos.every(todo => todo.completed)) {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: !todo.completed,
          })),
        };
      }
      return {
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      };
    });
  };

  saveToLocalStorage() {
    const todos = JSON.stringify(this.state.todos);
    localStorage.setItem('todos', todos);
  };

  handleFilter = (event) => {
    this.setState({
      activeFilter: event.target.name,
    })
  };

   filterTodos = (activeFilter) => {
    const { todos } = this.state;

     if (activeFilter === 'active') {
      return todos.filter(todo => todo.completed === false);
    }

     if (activeFilter === 'completed') {
      return todos.filter(todo => todo.completed === true);
    }
    return todos;
  };

  render () {
    const {activeFilter} = this.state;
    const displayedTodos = this.filterTodos(activeFilter);
    return (
      <section className="todoapp">
       <header className="header">
        <h1>todos</h1>
        </header>

        <AddTodo
          handleTodoAdd={this.handleTodoAdd}
        />

        <TodoList
          handleTodoDelete={this.handleTodoDelete}
          handleComplete={this.handleToggleCompleting}
          handleCompleteAll={this.handleToggleCompletingAll}
          handleEdit={this.handleEdit}
          displayedTodos={displayedTodos}
        />

        <Footer
          handleFilter={this.handleFilter}
          activeFilter={activeFilter}
          todos={displayedTodos}
          handleTodoDeleteCompleted={this.handleTodoDeleteCompleted}
        />

      </section>
    );
  };
}

export default App;
