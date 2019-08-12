import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

class TodoApp extends React.Component {
  state = {
    title: '',
    id: 0,
    completed: false,
  }

  saveCurrentTodoValue = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  }

  createTodo = (event) => {
    event.preventDefault();

    this.props.addTodo({
      ...this.state,
      id: Math.random() * 100,
    });

    this.setState({
      title: '',
    });
  }

  render() {
    const {
      todos,
      toggleTodo,
      toggleAll,
      toggleAllIsActive,
      destroyTodo,
    } = this.props;

    return (
      <form onSubmit={this.createTodo}>
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.title}
            onChange={this.saveCurrentTodoValue}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={toggleAllIsActive}
            onChange={() => toggleAll(toggleAllIsActive)}
          />
          {/* eslint-disable-next-line */}
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                destroyTodo={destroyTodo}
              />
            ))}
          </ul>
        </section>
      </form>
    );
  }
}

TodoApp.propTypes = {
  addTodo: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object),
  toggleTodo: PropTypes.func,
  toggleAll: PropTypes.func,
  toggleAllIsActive: PropTypes.func,
  destroyTodo: PropTypes.func,
}.isRequired;

export default TodoApp;
