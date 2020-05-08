import React from 'react';
import TaskAdd from './components/TaskAdd/TaskAdd';
import TaskList from './components/TaskList/TaskList';

class App extends React.Component {
  state = {
    tasksLength: 0,
    newTaskTitle: '',
    prevId: 0,
    tasks: [],

  }

  newTitle = (event) => {
    if (event.target.value.trim()) {
      this.setState({
        newTaskTitle: event.target.value,
      });
    }
  };

  handleReset = () => {
    this.setState({
      newTaskTitle: '',
    });
  };

  handleTitleChange = (event) => {
    event.preventDefault();
    this.setState((state) => {
      const newTask = {
        id: state.prevId + 1,
        title: state.newTaskTitle,
        condition: false,

      };

      return {
        tasks: [...state.tasks, newTask],
        prevId: newTask.id,
        tasksLength: state.tasksLength + 1,

      };
    });
    this.handleReset();
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Tasks</h1>
          <TaskAdd
            title={this.newTitle}
            change={this.handleTitleChange}
            value={this.state.newTaskTitle}
          />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TaskList tasks={this.state.tasks} />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {this.state.tasks.map(t => t.condition === 'new').length}
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
