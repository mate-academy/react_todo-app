import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

class TodoList extends React.PureComponent {
  render() {
    const { todos, changeStatus, deleteTodo, selectAllTodo } = this.props;
    const allChecked = todos.every(todo => todo.completed === true);

    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={selectAllTodo}
          checked={allChecked}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
              changeStatus={changeStatus}
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
  changeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  selectAllTodo: PropTypes.func.isRequired,
};

export default TodoList;
