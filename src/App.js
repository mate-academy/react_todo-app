import React from 'react';
import TodoList from './TodoList';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  state = {
    todos: [],
    filterType: 'All',
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  saveChangesTodo = (e, todoId, todoTitle) => {
    const title = e.target.value;

    if (e.key === 'Enter') {
      this.setState(prevState => ({
        todos: prevState.todos.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              title,
            };
          }

          return todo;
        }),
      }));
    }
  }

  onTodoChecked = (todoId, e) => {
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
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: select,
      })),
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
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todos, filterType } = this.state;
    const completedStatus = todos.length === 0
      ? false
      : todos.every(todo => todo.completed);
    const visibleClearCompleted = todos.some(todo => todo.completed);
    const incompleteTodosSum = todos.filter(todo => !todo.completed).length;
    const visibleTodos = this.getVisibleTodos(filterType);

    return (
      <section className="todoapp">
        <Header
          onTodo={this.addTodo}
        />
        <TodoList
          todos={visibleTodos}
          completedStatus={completedStatus}
          onFilteredTodos={this.onFilteredTodos}
          onAllSelected={this.onAllSelected}
          onTodoChecked={this.onTodoChecked}
          deleteTodo={this.deleteTodo}
          saveChangesTodo={this.saveChangesTodo}

        />

        <Footer
          noComlpetedTodo={incompleteTodosSum}
          onFilteredTodos={this.onFilteredTodos}
          clearCompleted={this.clearCompleted}
          visibleClearCompleted={visibleClearCompleted}
          filterType={filterType}
        />
      </section>
    );
  }
}

export default App;
