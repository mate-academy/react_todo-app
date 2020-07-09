import React from 'react';

export const Main = ({ tasks, completedChange, deleteTask }) => {

  return (
    <ul className="todo-list">
      {
        tasks.map((taskUnit) => {

          let activeClass = '';

          taskUnit.completed ? activeClass = 'completed' : activeClass = '';

          return (
            <li key={taskUnit.id} className={activeClass}>
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  id={`todo-${taskUnit.id}`}
                  onChange={completedChange}
                />
                <label htmlFor={`todo-${taskUnit.id}`}>{taskUnit.title}</label>
                <button
                  type="button"
                  className="destroy"
                  onClick={deleteTask}
                />
              </div>
              <input type="text" className="edit" />
            </li>
          );
        })
      }
    </ul>
  );
};
