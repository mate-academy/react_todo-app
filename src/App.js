import React from 'react';

import TodoApp from './components/TodoApp';
import TodoFilter from './components/TodoFilter';

class App extends React.Component {
  state = {
    todos: [],
    filterTodos: [],
    filterDescription: 'all',
    statusAllTodo: true,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
      statusAllTodo: true,
    }));
  }

  todosFilter = (desc) => {
    this.setState((prevState) => {
      switch (desc) {
        case 'all':
          return ({
            filterTodos: prevState.todos,
            filterDescription: 'all',
          });

        case 'active':
          return ({
            filterTodos: prevState.todos.filter(todo => !todo.completed),
            filterDescription: 'active',
          });

        case 'completed':
          return ({
            filterTodos: prevState.todos.filter(todo => todo.completed),
            filterDescription: 'completed',
          });

        default:
          return ({});
      }
    });
  }

  changeTodoCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id !== id
          ? todo
          : { ...todo, completed: !todo.completed }
      )),
    }));
  }

  changeStatusAllTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.statusAllTodo,
      }
      )),
      statusAllTodo: !prevState.statusAllTodo,
    }));
  }

  destroyTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  destroyAllCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      filterTodos: [],
    }));
  }

  render() {
    const { todos, filterTodos, filterDescription } = this.state;

    return (
      <section className="todoapp">

        <TodoApp
          todos={todos}
          filterTodos={filterTodos}
          filterDescription={filterDescription}
          addTodo={this.addTodo}
          changeTodoCompleted={this.changeTodoCompleted}
          changeTodoCompletedAll={this.changeStatusAllTodos}
          destroyTodo={this.destroyTodo}
        />

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {(todos.filter(todo => !todo.completed)).length}
            items left
          </span>

          <TodoFilter
            filterDescription={filterDescription}
            todosFilter={this.todosFilter}
          />

          <button
            onClick={this.destroyAllCompletedTodos}
            type="button"
            className="clear-completed"
            style={this.state.todos
              .some(todo => todo.completed)
              ? { display: 'block' }
              : { display: 'none' }}
          >
            Сlear completed
          </button>
        </footer>

      </section>
    );
  }
}

export default App;
