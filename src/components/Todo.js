import React from 'react';
import { Main } from './Main';
import Footer from './Footer';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

class Todo extends React.Component {
  state = {
    tasks: [],
    taskPattern: {
      title: '',
      id: 0,
      completed: false,
    },
    filteredTasks: null,
    lastId: 0,
  }

  writeTask = (event) => {
    const title = event.target.value;

    this.setState(prev => ({
      taskPattern: {
        title: `${title}`,
        id: prev.lastId,
        completed: false,
      },
      lastId: prev.lastId + 1,
    }));
  };

  saveTask = (event) => {
    if (event.key === 'Enter' && this.state.taskPattern.title !== '') {
      this.setState(prev => ({
        tasks: [
          ...prev.tasks,
          prev.taskPattern,
        ],
        taskPattern: {
          title: '',
          id: 0,
        },
      }));
    }
  };

  completedChange = (event) => {
    const activeTask = this.state.tasks.find(task => (
      Number(event
        .target
        .id
        .split(/todo-/)[1]) === task.id
    ));

    activeTask.completed = event.target.checked;
    const li = event.target.closest('LI');

    activeTask.completed ? li.className = 'completed' : li.className = '';
  }

  deleteTask = (event) => {
    const activeTask = this.state.tasks.find(task => (
      Number(event
        .target
        .previousElementSibling
        .htmlFor
        .split(/todo-/)[1]) === task.id
    ));

    this.setState(prev => ({
      tasks: prev.tasks.filter(task => (task !== activeTask)),
    }));
  }

  deleteCompleted = (event) => {
    this.setState(prev => ({
      tasks: prev.tasks.filter(task => (task.completed === false)),
    }));
  }

  filterCompleted = (event) => {
    event.preventDefault();
    this.setState(prev => ({
      filteredTasks: prev.tasks.filter(task => (task.completed === true)),
    }));
  };

  filterActive = (event) => {
    event.preventDefault();
    this.setState(prev => ({
      filteredTasks: prev.tasks.filter(task => (task.completed === false)),
    }));
  };

  filterAll = (event) => {
    event.preventDefault();
    this.setState(() => ({
      filteredTasks: null,
    }));
  };

  render() {
    let left = 0;
    const displayTasks = this.state.filteredTasks || [...this.state.tasks];

    displayTasks.forEach((task) => {
      if (task.completed === false) {
        left += 1;
      }
    });

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            value={this.state.taskPattern.title}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.writeTask}
            onKeyUp={this.saveTask}
          />
        </header>
        <Router>
          <section className="main">
            <input type="checkbox" id="toggle-all" className="toggle-all" />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <Main
              tasks={displayTasks}
              completedChange={this.completedChange}
              deleteTask={this.deleteTask}
            />
          </section>

          <Footer
            filterAll={this.filterAll}
            filterCompleted={this.filterCompleted}
            filterActive={this.filterActive}
            left={left}
            tasks={displayTasks}
            deleteCompleted={this.deleteCompleted}
          />
        </Router>

      </section>
    );
  }
}

export default Todo;
