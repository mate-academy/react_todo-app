import React from 'react';
import TodoApp from './components/TodoApp';

class App extends React.Component {
  state = {
    todos: [],
    toggleTodosStatus: false,
    filter: 'All',
  };

  addedTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  };

  changeCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
      toggleTodosStatus: false,
    }));
  };

  changeTitle = (title, id) => {
    this.setState(state => (
      {
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
            };
          }

          return todo;
        }),
        toggleTodosStatus: !state.toggleTodosStatus,
      }
    ));
  };

  deleteTodo = index => (
    this.setState((state) => {
      state.todos.splice(index, 1);

      return {
        todos: [...state.todos],
      };
    })
  );

  toggleAllTodos = () => (
    this.setState({
      toggleTodosStatus: false,
    })
  );

  toggleAllStatus = () => (
    this.setState(prev => (
      {
        todos: prev.todos.map(todo => (
          {
            ...todo,
            completed: !prev.toggleTodosStatus,
          })),
        toggleTodosStatus: !prev.toggleTodosStatus,
      }
    ))
  );

  filterTodo = (filter) => {
    if (filter === 'All') {
      this.setState({
        filter,
      });
    } else if (filter === 'Completed') {
      this.setState({
        filter,
      });
    } else if (filter === 'Active') {
      this.setState({
        filter,
      });
    }
  };

  clearCompletedTodos = () => (
    this.setState(prev => ({
      todos: prev.todos.filter(todo => todo.completed === false),
    }))
  );

  render() {
    const {
      todos,
      filter,
    } = this.state;
    let { toggleTodosStatus } = this.state;
    let filterTodos = [...todos];

    const countActive = filterTodos.filter(todo => (
      todo.completed === false)).length;

    if (filter === 'All') {
      filterTodos = [...todos];
    }

    if (filter === 'Completed') {
      filterTodos = filterTodos.filter(todo => (todo.completed === true));
    }

    if (filter === 'Active') {
      filterTodos = filterTodos.filter(todo => (todo.completed === false));
    }

    if (countActive === 0 && filterTodos.length > 0 && !toggleTodosStatus) {
      toggleTodosStatus = true;
    }

    return (
      <>
        <TodoApp
          todos={filterTodos}
          toggleTodosStatus={toggleTodosStatus}
          toggleAllTodos={this.toggleAllTodos}
          addedTodo={this.addedTodo}
          changeCompleted={this.changeCompleted}
          deleteTodo={this.deleteTodo}
          changeTitle={this.changeTitle}
          toggleAllStatus={this.toggleAllStatus}
          filterTodo={this.filterTodo}
          clearCompletedTodos={this.clearCompletedTodos}
          countActive={countActive}
          filter={filter}
        />
      </>
    );
  }
}

export default App;
