import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

class TodoApp extends React.Component {
  state = {
    title: '',
    id: 0,
    completed: false,
  }

  currentTodoValue = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  }

  addTodo = (event) => {
    event.preventDefault();

    this.state.title.length > 0 && this.props.addTodo({
      ...this.state,
      id: Date.now(),
    });

    this.setState({
      title: '',
    });
  }

  render() {
    const {
      todos,
      handleToggle,
      handleCheckAll,
      statusAllTodo,
      deleteTodo,
    } = this.props;

    const { title } = this.state;

    return (
      <form onSubmit={this.addTodo}>
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={this.currentTodoValue}
          />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={statusAllTodo}
            onChange={() => handleCheckAll(statusAllTodo)}
          />
          {/* eslint-disable-next-line */}
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                handleToggle={handleToggle}
                deleteTodo={deleteTodo}
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
  handleToggle: PropTypes.func,
  handleCheckAll: PropTypes.func,
  statusAllTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
}.isRequired;

export default TodoApp;
