import React from 'react';

import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter.js/TodoFilter';

class App extends React.Component {
  state = {
    todos: [],
    showTodos: 'all',
  }

  addTodo = (text, todoId) => {
    if (text.trim().length) {
      this.setState(prevState => ({
        todos: [
          ...prevState.todos,
          {
            id: todoId,
            todo: text,
            completed: false,
          },
        ],
      }));
    }
  }

  checkTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      }),
    }));
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== id),
    }));
  }

  editTodo = (editedTodo, id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            todo: editedTodo,
          };
        }

        return item;
      }),
    }));
  }

  filterTodos = (filter) => {
    this.setState({
      showTodos: filter,
    });
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.completed === false),
    }));
  }

  makeThemChecked = () => {
    if (this.state.todos.every(todo => todo.completed === true)) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }
  }

  showTodos(shownTodos) {
    if (shownTodos === 'all') {
      return this.state.todos;
    }

    if (shownTodos === 'active') {
      return this.state.todos.filter(todo => todo.completed === false);
    }

    if (shownTodos === 'completed') {
      return this.state.todos.filter(todo => todo.completed === true);
    }

    return null;
  }

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <TodoApp addTodo={this.addTodo} />
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.makeThemChecked}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          {todos.length
            ? (
              <TodoList
                todos={this.showTodos(this.state.showTodos)}
                check={this.checkTodo}
                remove={this.removeTodo}
                edit={this.editTodo}
              />
            )
            : <></>
          }
        </section>
        {todos.length
          ? (
            <TodoFilter
              todos={this.state.todos}
              filterTodos={this.filterTodos}
              clear={this.clearCompleted}
            />
          )
          : <></>
        }
      </section>
    );
  }
}

export default App;
