import React from 'react';
import TodoApp from './TodoApp';
import FilterBy from './FilterBy';

class App extends React.Component {
  state = {
    todos: [],
    todosFiltered: [],
    sortField: 'All',
    statusAllTodo: false,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
    this.sortFieldTodo(this.state.sortField);
  }

  handleToggle = (id) => {
    this.setState((prevstate) => {
      const toggledTodos = prevstate.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });

      return {
        todos: toggledTodos,
      };
    });
    this.sortFieldTodo(this.state.sortField);

    this.setState(prevstate => ({
      statusAllTodo: (prevstate.todos.every(
        todo => todo.completed
      )) && true,
    }));
  }

  handleCheckAll = (statusAllTodo) => {
    (statusAllTodo !== true)
      ? this.setState((prevState) => {
        const completeAll = prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        }));

        return {
          todos: completeAll,
          statusAllTodo: true,
        };
      })
      : this.setState((prevstate) => {
        const deleteAll = prevstate.todos.map(todo => ({
          ...todo,
          completed: false,
        }));

        return {
          todos: deleteAll,
          statusAllTodo: false,
        };
      });
    this.sortFieldTodo(this.state.sortField);
  }

  sortFieldTodo = (value) => {
    this.setState((prevstate) => {
      switch (value) {
        case 'Active':
          return {
            todosFiltered: prevstate.todos.filter(
              todo => !todo.completed
            ),
            sortField: 'Active',
          };
        case 'Completed':
          return {
            todosFiltered: prevstate.todos.filter(
              todo => todo.completed
            ),
            sortField: 'Completed',
          };

        case 'All':
          return {
            todosFiltered: prevstate.todos,
            sortField: 'All',
          };

        default:
          return {};
      }
    });
  }

  deleteTodo = (id) => {
    this.setState(prevstate => ({
      todos: prevstate.todos.filter(todo => todo.id !== id),
    }));

    this.sortFieldTodo(this.state.sortField);
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));

    this.sortFieldTodo(this.state.sortField);
  }

  render() {
    const {
      todos, sortField, statusAllTodo, todosFiltered,
    } = this.state;

    const visibleTodos = (sortField === 'All')
      ? todos
      : todosFiltered;

    return (
      <section className="todoapp">
        <TodoApp
          todos={visibleTodos}
          addTodo={this.addTodo}
          handleToggle={this.handleToggle}
          handleCheckAll={this.handleCheckAll}
          statusAllTodo={statusAllTodo}
          deleteTodo={this.deleteTodo}
        />
        <FilterBy
          todos={todos}
          sortFieldTodo={this.sortFieldTodo}
          sortField={sortField}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
