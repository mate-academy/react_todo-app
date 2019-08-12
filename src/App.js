import React from 'react';

import TodoApp from './TodoApp';
import Footer from './Footer';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    selectedFilter: 'All',
    toggleAllIsActive: false,
  }

  addTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
    this.todosFilter(this.state.selectedFilter);
  }

  toggleTodo = (id) => {
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
    this.todosFilter(this.state.selectedFilter);

    this.setState(prevstate => ({
      toggleAllIsActive: (prevstate.todos.every(
        todo => todo.completed
      )) && true,
    }));
  }

  toggleAll = (toggleAllIsActive) => {
    (toggleAllIsActive !== true)
      ? this.setState((prevState) => {
        const completeAll = prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        }));

        return {
          todos: completeAll,
          toggleAllIsActive: true,
        };
      })
      : this.setState((prevstate) => {
        const remoteAll = prevstate.todos.map(todo => ({
          ...todo,
          completed: false,
        }));

        return {
          todos: remoteAll,
          toggleAllIsActive: false,
        };
      });
    this.todosFilter(this.state.selectedFilter);
  }

  todosFilter = (value) => {
    this.setState((prevstate) => {
      switch (value) {
        case 'Active':
          return {
            filteredTodos: prevstate.todos.filter(
              todo => !todo.completed
            ),
            selectedFilter: 'Active',
          };

        case 'Completed':
          return {
            filteredTodos: prevstate.todos.filter(
              todo => todo.completed
            ),
            selectedFilter: 'Completed',
          };

        case 'All':
          return {
            filteredTodos: prevstate.todos,
            selectedFilter: 'All',
          };

        default:
          return {};
      }
    });
  }

  destroyTodo = (id) => {
    this.setState(prevstate => ({
      todos: prevstate.todos.filter(todo => todo.id !== id),
    }));

    this.todosFilter(this.state.selectedFilter);
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));

    this.todosFilter(this.state.selectedFilter);
  }

  render() {
    const {
      todos, selectedFilter, toggleAllIsActive, filteredTodos,
    } = this.state;

    const visibleTodos = (selectedFilter === 'All') ? todos : filteredTodos;

    return (
      <section className="todoapp">
        <TodoApp
          todos={visibleTodos}
          addTodo={this.addTodo}
          toggleTodo={this.toggleTodo}
          toggleAll={this.toggleAll}
          toggleAllIsActive={toggleAllIsActive}
          destroyTodo={this.destroyTodo}
        />
        <Footer
          todos={todos}
          todosFilter={this.todosFilter}
          selectedFilter={selectedFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
