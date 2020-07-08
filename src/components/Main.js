import React from 'react';

const Main = ({ tasks, completedChange, deleteTask }) => (
  <section className="main">
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {
        (tasks).map((taskUnit) => {
          return (
            <li key={taskUnit.id}>
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
  </section>
);

export default Main;

/*

          <li className="editing">
            <div className="view">
              <input type="checkbox" className="toggle" id="todo-3" />
              <label htmlFor="todo-3">zxcvbnm</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

*/
