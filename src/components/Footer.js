import React from 'react';

const Footer = ({ renderFooter, tasks, deleteCompleted }) => {

  const left = tasks.map(task => {
    if (task.completed === false) {
      return task;
    }
  });

  if (!renderFooter) {
    return null;
  }

  const allFilter = (event) => {
    event.preventDefault();
    
  }

  const activeFilter = (event) => {
    event.preventDefault();
    this.setState(prev => ({
      tasksShow: prev.tasksShow.filter(task => (task.completed === false)),
    }));
  }

  const completedFilter = (event) => {
    event.preventDefault();
    this.setState(prev => ({
      tasksShow: prev.tasksShow.filter(task => (task.completed === true)),
    }));
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        {left.length}
        &nbsp;
        items left
      </span>
      <ul className="filters">
        <li>
          <a
            href="/"
            className="selected"
            onClick={allFilter}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="/active"
            onClick={activeFilter}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="/completed"
            onClick={completedFilter}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
