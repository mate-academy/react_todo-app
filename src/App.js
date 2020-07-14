import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

export class App extends React.Component {
  state = {
    todos: [],
    show: 'all',
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  checkedTodo = (id) => {
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

  editTodo = (edited, id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: edited,
          };
        }

        return todo;
      }),
    }));
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  makeThemChecked = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => todo.completed === 'true'),
    }));
  }

  filterChange = (filter) => {
    this.setState({
      show: filter,
    });
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.completed === false),
    }));
  }

  show(selectedFilter) {
    if (selectedFilter === 'all') {
      return this.state.todos;
    }

    if (selectedFilter === 'active') {
      return this.state.todos.filter(todo => !todo.completed);
    }

    if (selectedFilter === 'completed') {
      return this.state.todos.filter(todo => todo.completed);
    }

    return '';
  }

  render() {
    const { todos, show } = this.state;

    return (
      <section className="todoapp">
        <TodoApp
          todos={todos}
          addTodo={this.addTodo}
        />
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.makeThemChecked}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={this.show(show)}
            checked={this.checkedTodo}
            edit={this.editTodo}
            remove={this.removeTodo}
          />
        </section>
        {
          todos.length
            ? (
              <TodoFilter
                todos={todos}
                filterChange={this.filterChange}
                clearCompleted={this.clearCompleted}
              />
            )
            : ''
        }
      </section>
    );
  }
}
