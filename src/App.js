import React from 'react';
import TodoList from './TodoList';
import NewTodo from './NewTodo';
import Filters from './Filters';

class App extends React.Component {
  state = {
    todos: [],
    typeOfFilter: 'All',
  }

  newTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  handleMarkAll =() => {
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

  handleChangeStatus = (id) => {
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

  deleteTodo = ({ target }) => {
    const indexOfDeletedTodo = this.state.todos
      .findIndex(item => item.id === +target.id);

    this.setState((prevState) => {
      const newListOfTodos = [...prevState.todos];

      newListOfTodos.splice(indexOfDeletedTodo, 1);

      return (
        { todos: [...newListOfTodos] }
      );
    });
  }

  handleChangeFilter = (filter) => {
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
        <header className="header">
          <h1>todos</h1>
        </header>
        <NewTodo
          newTodo={this.newTodo}
        />
        <TodoList
          todos={visibleTodos}
          handleChangeStatus={this.handleChangeStatus}
          deleteTodo={this.deleteTodo}
          handleMarkAll={this.handleMarkAll}
        />
        {todos.length > 0
          && (
            <footer className="footer">
              <span className="todo-count">
                {countOfNotFinishedTodos}
                {' '}
                items left
              </span>
              <Filters
                typeOfFilter={typeOfFilter}
                handleChangeFilter={this.handleChangeFilter}
              />
              <button
                type="button"
                onClick={this.clearCompleted}
                className="clear-completed"
              >
                Clear completed
              </button>
            </footer>
          )
        }
      </section>
    );
  }
}

export default App;
