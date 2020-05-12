import React from 'react';
import TodoList from './TodoList';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  state = {
    todos: [],
    typeOfFilter: 'All',
  }

  addNewTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  markAll =() => {
    if (this.state.todos.every(todo => todo.completed === true)) {
      this.setState(state => ({
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: false,
          }
        )),
      }));
    } else {
      this.setState(state => ({
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: true,
          }
        )),
      }));
    }
  }

  changeStatus = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  deleteTodo = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id),
    }));
  }

  changeFilter = (filter) => {
    this.setState({
      typeOfFilter: filter,
    });
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todos, typeOfFilter } = this.state;
    const countOfNotFinishedTodos = todos
      .filter(todo => todo.completed === false).length;
    let visibleTodos = [...todos];

    if (typeOfFilter === 'All') {
      visibleTodos = [...todos];
    }

    if (typeOfFilter === 'Completed') {
      visibleTodos = todos.filter(todo => todo.completed);
    }

    if (typeOfFilter === 'Active') {
      visibleTodos = todos.filter(todo => !todo.completed);
    }

    return (
      <section className="todoapp">

        <Header addNewTodo={this.addNewTodo} />
        <TodoList
          todos={visibleTodos}
          changeStatus={this.changeStatus}
          deleteTodo={this.deleteTodo}
          markAll={this.markAll}
        />
        {todos.length > 0
          && (
            <Footer
              typeOfFilter={typeOfFilter}
              changeFilter={this.changeFilter}
              countOfNotFinishedTodos={countOfNotFinishedTodos}
              clearCompleted={this.clearCompleted}
            />
          )}

      </section>
    );
  }
}

export default App;
