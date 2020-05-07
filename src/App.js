import React from 'react';
import TodoList from './TodoList';

class App extends React.PureComponent {
  state = {
    todoList: [],
    newTodoId: 0,
    completed: false,
    title: '',
  }

  clearCompleted = () => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => todo.completed !== true),
    }));
  }

  makeCompletedAll = () => {
    if (this.state.todoList.every(todo => todo.completed === true)) {
      this.setState(state => ({
        todoList: state.todoList.map(todo => (
          {
            ...todo,
            completed: false,
          }
        )),
      }));
    } else {
      this.setState(state => ({
        todoList: state.todoList.map(todo => (
          {
            ...todo,
            completed: true,
          }
        )),
      }));
    }
  }

  makeCompleted = (id) => {
    this.setState(state => ({
      todoList: state.todoList.map((todo) => {
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

  detectUncompletedItems = () => (
    this.state.todoList.filter(el => el.completed === false).length
  )

  deleteItem = (id) => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => todo.id !== id),
    }));
  }

  addTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  resetState = () => {
    this.setState(state => ({
      title: '',
      newTodoId: state.newTodoId + 1,
    }));
  }

  addNewTodo = (event) => {
    event.preventDefault();
    this.state.title.trim() && this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          title: state.title,
          id: state.newTodoId + 1,
          completed: state.completed,
        },
      ],
    }));
    this.resetState();
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.addNewTodo}>
            <input
              value={this.state.title}
              onChange={this.addTitle}
              className="new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.makeCompletedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={this.state.todoList}
            completed={this.makeCompleted}
            deleteItem={this.deleteItem}
          />
          {this.state.todoList.length > 0 && (
            <footer className="footer">
              <span className="todo-count">
                {this.detectUncompletedItems()}
                {' '}
                items left
              </span>
              <ul className="filters">
                <li>
                  <a href="#/" className="selected">All</a>
                </li>
                <li><a href="#/active">Active</a></li>
                <li><a href="#/completed">Completed</a></li>
              </ul>
              <button
                type="button"
                className="clear-completed"
                onClick={this.clearCompleted}
              >
                Clear completed
              </button>
            </footer>
          )}
        </section>
      </section>
    );
  }
}

export default App;
