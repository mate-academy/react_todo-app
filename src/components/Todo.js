import React from 'react';
import { Main } from './Main';
import Footer from './Footer';

class Todo extends React.Component {
  state = {
    tasks: JSON.parse(localStorage.getItem('savedTasks')) || [],
    taskPattern: {
      title: '',
      id: 0,
      completed: false,
    },
    filteredTasks: null,
    lastId: 0,
    filterClass: ['selected', '', ''],
  }

  componentDidUpdate() {
    const { tasks } = this.state;

    localStorage.setItem('savedTasks', JSON.stringify(tasks));
  }

  writeTask = (event) => {
    const title = event.target.value;

    this.setState(previous => ({
      taskPattern: {
        title: `${title}`,
        id: previous.lastId,
        completed: false,
      },
      lastId: previous.lastId + 1,
    }));
  };

  saveTask = (event) => {
    if (event.key === 'Enter' && this.state.taskPattern.title !== '') {
      this.setState(previous => ({
        tasks: [
          ...previous.tasks,
          previous.taskPattern,
        ],
        taskPattern: {
          title: '',
          id: 0,
        },
      }));
    }
  };

  completedChange = (event) => {
    const targetId = Number(event.target.id.split(/todo-/)[1]);

    this.setState(previous => ({
      tasks: previous.tasks.map((task) => {
        if (task.id === targetId) {
          return ({
            ...task,
            completed: !task.completed,
          });
        }

        return task;
      }),
      filteredTasks: null,
      filterClass: ['selected', '', ''],
    }));
  }

  completedAll = (event) => {
    const check = event.target;

    this.setState(previous => ({
      tasks: previous.tasks.map(task => ({
        ...task,
        completed: check.checked,
      })),
    }));
  }

  deleteTask = (event) => {
    const activeTask = this.state.tasks.find(task => (
      Number(event
        .target
        .previousElementSibling
        .htmlFor
        .split(/todo-/)[1]) === task.id
    ));

    this.setState(previous => ({
      tasks: previous.tasks.filter(task => (task !== activeTask)),
    }));
  }

  deleteCompleted = (event) => {
    this.setState(previous => ({
      tasks: previous.tasks.filter(task => (task.completed === false)),
    }));
    this.filterAll(event);
  }

  filters = (event, condition) => {
    let classFilter = [];

    condition === true
      ? classFilter = ['', '', 'selected']
      : classFilter = ['', 'selected', ''];

    event.preventDefault();
    this.setState(previous => ({
      filteredTasks: previous
        .tasks
        .filter(task => (task.completed === condition)),
      filterClass: classFilter,
    }));
  }

  filterAll = (event) => {
    event.preventDefault();
    this.setState(() => ({
      filteredTasks: null,
      filterClass: ['selected', '', ''],
    }));
  };

  render() {
    const displayTasks = this.state.filteredTasks || [...this.state.tasks];

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

        <Main
          tasks={displayTasks}
          completedChange={this.completedChange}
          completedAll={this.completedAll}
          deleteTask={this.deleteTask}
        />

        <Footer
          deleteCompleted={this.deleteCompleted}
          filterClass={this.state.filterClass}
          filterAll={this.filterAll}
          filters={this.filters}
          tasks={this.state.tasks}
        />

      </section>
    );
  }
}

export default Todo;
