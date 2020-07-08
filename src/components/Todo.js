import React from 'react';
import Main from './Main';
import Footer from './Footer';

class Todo extends React.Component {
  state = {
    tasks: [],
    taskPattern: {
      title: '',
      id: 0,
      completed: false,
    },
    lastId: 0,
    renderFooter: false,
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

        renderFooter: true,
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

    this.allFilter(event);
  }

  deleteCompleted = (event) => {
    this.setState(prev => ({
      tasks: prev.tasks.filter(task => (task.completed === false)),
    }));
    this.allFilter(event);
  }

  render() {

    if (this.state.tasks.length === 0) {
      this.state.renderFooter = false;
    }

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
          tasks={this.state.tasks}
          completedChange={this.completedChange}
          deleteTask={this.deleteTask}
        />

        <Footer
          renderFooter={this.state.renderFooter}
          tasks={this.state.tasks}
          deleteCompleted={this.deleteCompleted}
        />

      </section>
    );
  }
}

export default Todo;
