import React from 'react';
import TodoList from './TodoList';
import Footer from './Footer';
import Header from './Header';

const filterTypes = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

class TodoApp extends React.Component {
  state = {
    todos: [],
    allCompleted: false,
    filter: filterTypes.all,
  }

  addTodo = todo => this.setState(prev => ({
    todos: [...prev.todos, todo],
    filter: filterTypes.all,
  }))

  removeTodo = (todoId) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== todoId),
    }));
  }

  toggleTodoCompleted = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map(todo => (todo.id === todoId
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo
      )),
    }));
    this.setState(state => (
      { allCompleted: state.todos.every(todo => todo.completed) }
    ));
  }

  toggleTodoCompletedAll = () => {
    this.setState(state => ({
      allCompleted: !state.allCompleted,
      todos: state.todos.map(todo => ({
        ...todo, completed: !state.allCompleted,
      })),
    }));
  }

  removeAllCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  }

  setFilter = (currentFilter) => {
    this.setState({ filter: currentFilter });
  };

  render() {
    return (
      <>
        <Header
          addTodo={this.addTodo}
        />
        <TodoList
          todos={this.state.todos.filter(
            (todo) => {
              if (this.state.filter === 'Active') {
                return todo.completed === false;
              }

              if (this.state.filter === 'Completed') {
                return todo.completed === true;
              }

              return todo;
            }
          )}
          toggleTodoCompleted={this.toggleTodoCompleted}
          toggleTodoCompletedAll={this.toggleTodoCompletedAll}
          allCompleted={this.state.allCompleted}
          removeTodo={this.removeTodo}
        />
        <Footer
          todos={this.state.todos}
          setFilter={this.setFilter}
          removeAllCompleted={this.removeAllCompleted}
          filterTypes={filterTypes}
          currentFilter={this.state.filter}
        />
      </>
    );
  }
}

export default TodoApp;
