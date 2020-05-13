import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

class TodoList extends React.PureComponent {
  render() {
    const {
      deleteTodo,
      changeStatus,
      visibleTodos,
    } = this.props;

    return (
      <ul className="todo-list">
        {visibleTodos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            changeStatus={changeStatus}
            deleteTodo={deleteTodo}
          />
        ))
        }
      </ul>
    );
  }
}

TodoList.propTypes = {
  visibleTodos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};

export default TodoList;
