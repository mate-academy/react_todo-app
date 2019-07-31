import React from 'react';

const TodoList = ({ tasks, changeStatus, destroyTask }) => (
  tasks.map(task => (
    <li className={task.completed && 'completed'}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${task.id}`}
          checked={task.completed}
          onChange={() => changeStatus(task.id)}
        />
        {/* eslint-disable-next-line */}
        <label htmlFor={`todo-${task.id}`}>
          {task.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => destroyTask(task.id)}
        />
      </div>
    </li>
  ))
);

export default TodoList;
