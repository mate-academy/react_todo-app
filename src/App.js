import React from 'react';
import { TodoList } from './components/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';

export class App extends React.Component {
  state = {
    todos: [],
    filter: 'all',
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  addNewTodo = (text) => {
    if (text.trim().length > 0) {
      this.setState(prevState => ({
        todos:
        [
          ...prevState.todos,
          {
            id: prevState.todos.length + 1,
            todo: text,
            completed: false,
          },
        ],
      }));
    }
  }

  toggleProperty = (arr, id) => arr.map(item => (item.id === id
    ? {
      ...item,
      completed: !item.completed,
    }
    : item));

  onToggle = (id) => {
    this.setState(({ todos }) => ({
      todos: this.toggleProperty(todos, id),
    }));
  }

  onToggleDoneAll = (todos) => {
    todos.map(todo => this.onToggle(todo.id));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filterTodo = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.completed);
      case 'completed':
        return items.filter(item => item.completed === true);
      default:
        return items;
    }
  }

  clearHandler = (completedTodos) => {
    completedTodos.map(todo => this.deleteTodo(todo.id));
  };

  render() {
    const { todos, filter } = this.state;

    const visibleTodos = this.filterTodo(todos, filter);
    const unCompletedTodos = todos.filter(todo => !todo.completed);
    const todosCount = unCompletedTodos.length;
    const completedTodos = todos.filter(todo => todo.completed);
    const doneCount = completedTodos.length;

    return (
      <section className="todoapp">
        <Header
          addNewTodo={this.addNewTodo}
          todos={unCompletedTodos}
          onToggleDoneAll={this.onToggleDoneAll}
        />
        <section className="main">
          <TodoList
            todos={visibleTodos}
            onDeleted={this.deleteTodo}
            onToggle={this.onToggle}
          />
        </section>
        {todos.length > 0 && (
          <Footer
            todosCount={todosCount}
            doneCount={doneCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearHandler={this.clearHandler}
            completedTodos={completedTodos}
          />
        )}
      </section>
    );
  }
}
