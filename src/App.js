import React from 'react';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';

class App extends React.Component {
  state = {
    tasks: [
      {
        id: 0, title: 'go Home', completed: false,
      },
    ],
  };

  addTask = (taskName) => {
    this.setState((prevState) => {
      const { tasks } = prevState;

      tasks.push({
        id: tasks.length !== 0 ? tasks.length : 0,
        title: taskName,
        completed: false,
      });

      return tasks;
    });
  };

  toggleCompleteTask = (id) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          completed: !task.completed,
        };
      }),
    }));
  };

  deleteTask = (id) => {
    const index = this.state.tasks.map(task => task.id).indexOf(id);

    this.setState((prevState) => {
      const { tasks } = prevState;

      delete tasks[index];

      return tasks;
    });
  }

  render() {
    const { tasks } = this.state;
    const activeTasks = tasks.filter(task => !task.completed);
    const doneTasks = tasks.filter(task => task.completed);
    const allTasks = [...activeTasks, ...doneTasks];

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp addTask={this.addTask} />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            tasks={allTasks}
            toggleCompleteTask={this.toggleCompleteTask}
            deleteTask={this.deleteTask}
          />

        </section>

        <footer className="footer">
          <span className="todo-count">
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            {tasks.filter(task => task.completed === false).length} items left
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
