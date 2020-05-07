import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

class TodoList extends Component {
  state = {
    toggleAll: false,
  }

  componentDidUpdate() {
    const { todoList } = this.props;
    const { toggleAll } = this.state;

    const activeTodoCount = (todoList
      .filter(({ completed }) => !completed) || []
    ).length;

    if (activeTodoCount === 0 && !toggleAll) {
      this.setToggle(true);
    }

    if (activeTodoCount !== 0 && toggleAll) {
      this.setToggle(false);
    }
  }

  setToggle = (newState) => {
    this.setState({ toggleAll: newState });
  }

  handleToggleAll = () => {
    const { toggleAll } = this.state;
    const {
      setAll,
    } = this.props;

    this.setState(state => ({
      toggleAll: !state.toggleAll,
    }), () => {
      if (!toggleAll) {
        setAll(true);
      } else {
        setAll(false);
      }
    });
  }

  render() {
    const {
      todoList,
      handleCompleteToggle,
      handleDeleteTodo,
      setNewTitle,
    } = this.props;

    const { toggleAll } = this.state;

    return (
      <section className="main">
        {todoList.length !== 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={toggleAll}
              onChange={this.handleToggleAll}
            />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>
          </>
        )}

        <ul className="todo-list">
          {todoList.map(({ id, title, completed }) => (
            <TodoItem
              key={id}
              id={id}
              title={title}
              completed={completed}
              handleCompleteToggle={handleCompleteToggle}
              handleDeleteTodo={handleDeleteTodo}
              setNewTitle={setNewTitle}
            />
          ))}
        </ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  handleCompleteToggle: PropTypes.func.isRequired,
  setAll: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  setNewTitle: PropTypes.func.isRequired,
};

export default TodoList;
