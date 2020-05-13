import React from 'react';
import propTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ tasks, changeCondition, deleteTask }) => (
  <ul className="todo-list">
    {tasks.map(task => (
      <TodoItem
        task={task}
        changeCondition={changeCondition}
        deleteTask={deleteTask}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  changeCondition: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
  tasks: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
};

export default TodoList;
