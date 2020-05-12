import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

class TodoList extends PureComponent {
  render() {
    const {
      todoList,
      handleCompleteToggle,
      handleDeleteTodo,
      setNewTitle,
    } = this.props;

    return (

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
  handleDeleteTodo: PropTypes.func.isRequired,
  setNewTitle: PropTypes.func.isRequired,
};

export default TodoList;
