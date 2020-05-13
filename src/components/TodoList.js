import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ visibleTasks, toggleCompleteTask, deleteTask }) => (
  <ul className="todo-list">
    {visibleTasks.map(task => (
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
  visibleTasks: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
  toggleCompleteTask: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
};

export default TodoList;
