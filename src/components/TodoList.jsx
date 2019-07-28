import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = (props) => {
  const {
    allToggle,
    filteredTodos,
    handleTodoToggle,
    handleAllToggle,
    handleDestroyTodo,
  } = props;

  const getClassesAllToggle = classnames(
    {
      'toggle-all': true,
      'toggle-all--active': allToggle,
    }
  );

  return (
    <section className="main">

      <input
        type="checkbox"
        id="toggle-all"
        className={getClassesAllToggle}
        onChange={handleAllToggle}
      />

      {/* eslint-disable-next-line */}
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">

        {filteredTodos.map(todoItem => (
          <TodoItem
            key={todoItem.id}
            todo={todoItem}
            handleTodoToggle={handleTodoToggle}
            handleDestroyTodo={handleDestroyTodo}
          />
        ))}

      </ul>
    </section>
  );
};

TodoList.propTypes = {
  allToggle: PropTypes.bool,
  handleTodoToggle: PropTypes.func,
  handleAllToggle: PropTypes.func,
  handleDestroyTodo: PropTypes.func,
  filteredTodos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.instanceOf(Date),
  })).isRequired,
};

TodoList.defaultProps = {
  handleTodoToggle: () => {},
  handleAllToggle: () => {},
  handleDestroyTodo: () => {},
  allToggle: false,
};

export default TodoList;
