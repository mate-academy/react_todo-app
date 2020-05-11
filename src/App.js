import React from 'react';

import { HeaderForm } from './HeaderForm/HeaderForm';
import { TodoList } from './TodoList/TodoList';
import { FilterTodos } from './FilterTodos/FilterTodos';

class App extends React.Component {
  state = {
    todos: [],
    newId: 1,
    filter: 'All',
  }

  addTodo = (title) => {
    if (!title) {
      return;
    }

    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          title,
          id: state.newId,
          completed: false,
        },
      ],
      newId: state.newId + 1,
    }));
  }

  removeTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  }

  changeStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return {
          ...todo,
        };
      }),
    }));
  }

  setFilter = (filter) => {
    this.setState({ filter });
  }

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  }

  toggleAll = ({ target }) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: target.checked,
      })),
    }));
  }

  isCompletedAll = () => (
    this.state.todos.every(todo => todo.completed)
  )

  render() {
    let allTodos = [...this.state.todos];

    if (this.state.filter === 'Completed') {
      allTodos = allTodos.filter(todo => todo.completed);
    }

    if (this.state.filter === 'Active') {
      allTodos = allTodos.filter(todo => !todo.completed);
    }

    return (
      <section className="todoapp">
        <HeaderForm
          addTodo={this.addTodo}
        />

        <section className="main">
          {this.state.todos.length
            ? (<input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={this.isCompletedAll()}
              onClick={event => this.toggleAll(event)}
            />)

            : ''
          }
          <label htmlFor="toggle-all" />
          <TodoList
            todos={allTodos}
            removeTodo={this.removeTodo}
            changeStatus={this.changeStatus}
          />
        </section>

        { this.state.todos.length
          ? (
            <footer className="footer">
              <FilterTodos
                filter={this.state.filter}
                setFilter={this.setFilter}
                clearCompleted={this.clearCompleted}
                todos={allTodos}
              />
            </footer>
          )
          : ''
        }
      </section>
    );
  }
}

export default App;
