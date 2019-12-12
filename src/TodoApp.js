import React from 'react';
import TodoList from './components/TodoList';
import TodosFilter from './components/TodosFilter';

class TodoApp extends React.Component {
  state = {
    todos: [],
    todoToAdd: '',
    filter: '',
  }

  setFilter = (filter) => {
    this.setState({
      filter,
    });
  }

  deleteTodo = (index) => {
    this.setState(state => ({
      todos: state.todos.filter((el, i) => i !== index),
    }));
  }

  isCompleted = (completed, todoId) => {
    this.setState(state => ({
      todos: state.todos.map((currentTodo) => {
        if (currentTodo.id !== todoId) {
          return currentTodo;
        }

        return ({
          ...currentTodo,
          completed,
        });
      }),
    }));
  }

  selectAll = (completed) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed,
      })),
    }));
  }

  addNew() {
    if (!this.state.todoToAdd.trim()) {
      return;
    }

    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          title: state.todoToAdd,
          id: +new Date(),
          completed: false,
        },
      ],
      todoToAdd: '',
    }));
  }

  render() {
    let todosFiltered;

    switch (this.state.filter) {
      case 'active':
        todosFiltered = this.state.todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        todosFiltered = this.state.todos.filter(todo => todo.completed);
        break;
      default:
        todosFiltered = this.state.todos;
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              this.addNew();
            }}
          >
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.todoToAdd}
              onChange={event => this.setState({
                todoToAdd: event.target.value,
              })}
            />
          </form>
        </header>

        <section
          className="main"
          style={this.state.todos.length > 0
            ? { display: 'block' }
            : { display: 'none' }}
        >
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={this.state.todos.every(todo => todo.completed)}
            onChange={event => this.selectAll(event.target.checked)}
          />
          {/* eslint-disable-next-line */}
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todosFiltered}
            isCompleted={this.isCompleted}
            deleteTodo={this.deleteTodo}
          />
        </section>

        <footer
          className="footer"
          style={this.state.todos.length > 0
            ? { display: 'block' }
            : { display: 'none' }}
        >
          <span className="todo-count">
            {this.state.todos.reduce((amount, todo) => (todo.completed
              ? amount
              : amount + 1
            ), 0)}
            {' '}
            items left
          </span>

          <TodosFilter
            filter={this.state.filter}
            setFilter={this.setFilter}
          />

          {this.state.todos.some(todo => todo.completed) && (
            <button
              type="button"
              className="clear-completed"
              style={{ display: 'block' }}
              onClick={() => this.setState(state => ({
                todos: state.todos.filter(todo => !todo.completed),
              }))}
            >
              Clear completed
            </button>
          )}
        </footer>
      </section>
    );
  }
}

export default TodoApp;
