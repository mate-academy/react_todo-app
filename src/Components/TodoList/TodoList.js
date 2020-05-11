/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';

class TodoList extends React.Component {
state = {
  clicks: 1,
}

clicksIncrement = () => {
  this.setState(prev => ({
    clicks: prev.clicks + 1,
  }));
}

render() {
  const { todosList,
    handleTaskRemover,
    statusHandler,
    checkAllTasks,
    updateTask } = this.props;

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={todosList.every(task => task.completed)}
      />
      <label
        checked={this.state.checked}
        htmlFor="toggle-all"
        onClick={() => {
          this.clicksIncrement();
          checkAllTasks(this.state.clicks);
        }}
      >
        Mark all as complete
      </label>

      <ul className="todo-list">
        {todosList.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleTaskRemover={handleTaskRemover}
            statusHandler={statusHandler}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </section>
  );
}
}

TodoList.propTypes = {
  todosList: PropTypes.arrayOf({
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  handleTaskRemover: PropTypes.func.isRequired,
  statusHandler: PropTypes.func.isRequired,
  checkAllTasks: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TodoList;
