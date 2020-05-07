import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

class TodoList extends React.PureComponent {
  render() {
    const {
      todos,
      deleteTodo,
      changeStatus,
      // changeTitle,
    } = this.props;

    return (
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            // changeTitle={changeTitle}
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
  todos: PropTypes.arrayOf(
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
