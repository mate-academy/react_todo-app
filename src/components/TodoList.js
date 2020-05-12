import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, toggleCompleteTask, deleteTask }) => (
  <ul className="todo-list">
    {tasks.map(task => (
      <TodoItem
        key={task.id}
        task={task}
        toggleCompleteTask={toggleCompleteTask}
        deleteTask={deleteTask}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  tasks: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
  toggleCompleteTask: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
};

export default TodoList;
