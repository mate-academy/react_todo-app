import React from 'react';
import { mainShape } from './shapes';

export const Main = ({ tasks, completedChange, deleteTask, completedAll }) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onClick={completedAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

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
                  checked={taskUnit.completed}
                />
                <label
                  htmlFor={`todo-${taskUnit.id}`}
                >
                  {taskUnit.title}
                </label>
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
  </section>
);

Main.propTypes = mainShape.isRequired;
