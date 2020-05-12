import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

class TodoList extends React.PureComponent {
  render() {
    const { todos, deleteTodo, handleChangeStatus, handleMarkAll } = this.props;

    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={todos.length > 0 && todos.every(todo => todo.completed)}
          onChange={handleMarkAll}
        />
        {todos.length > 0 && (
          <label htmlFor="toggle-all">Mark all as complete</label>
        )}
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              handleChangeStatus={handleChangeStatus}
              key={todo.id}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleMarkAll: PropTypes.func.isRequired,
};

export default TodoList;
