import React from 'react';
import TodoList from './TodoList';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  state = {
    todos: [],
    filterType: '',
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  onTodoSelected = (todoId, e) => {
    // console.log('e.todo',e);

    // e.stopPropagation();
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  onAllSelected = (select) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (select) {
          return {
            ...todo,
            completed: true,
          };
        }

        return {
          ...todo,
          completed: false,
        };
      }),
    }));
  }

  onFilteredTodos = (filterType) => {
    this.setState({
      filterType,
    });
  }

  getVisibleTodos = () => {
    const { todos, filterType } = this.state;

    if (filterType === 'Active') {
      return todos.filter(todo => !todo.completed);
    }

    if (filterType === 'Completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  deleteTodo = (todoId) => {
    // console.log('e.todo',e);

    // e.stopPropagation();
    this.setState((prevState) => {
      const todoItem = prevState.todos.find(todo => todo.id === todoId);
      const index = prevState.todos.indexOf(todoItem);

      prevState.todos.splice(index, 1);

      return {
        todos: prevState.todos,
      };
    });
  }

  render() {
    const { todos, filterType } = this.state;
    const completedStatus = todos.length === 0
      ? false
      : todos.every(todo => todo.completed);
    const counter = todos.filter(todo => !todo.completed).length;
    const visibleTodos = this.getVisibleTodos(filterType);

    return (
      <section className="todoapp">
        <Header onTodo={this.addTodo} />
        <TodoList
          todos={visibleTodos}
          completedStatus={completedStatus}
          onFilteredTodos={this.onFilteredTodos}
          onAllSelected={this.onAllSelected}
          onTodoSelected={this.onTodoSelected}
          deleteTodo={this.deleteTodo}
        />

        <Footer
          noComlpetedTodo={counter}
          onFilteredTodos={this.onFilteredTodos}
        />
      </section>
    );
  }
}

export default App;
