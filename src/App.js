import React from 'react';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    tasks: [],
    tasksToShow: 'all',
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

  clearCompleted = () => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.completed === false),
    }));
  }

  filterTodos = (whichTasksToShow) => {
    const { tasks } = this.state;

    switch (whichTasksToShow) {
      case 'active':
        return tasks.filter(task => !task.completed);

      case 'completed':
        return tasks.filter(task => task.completed);

      default:
        return tasks;
    }
  }

  isAnyActiveTasks = () => (
    this.state.tasks.filter(task => !task.completed).length
  );

  toggleAllTasksCompleted = () => {
    if (this.state.tasks.every(task => task.completed)) {
      this.setState(prevState => ({
        tasks: prevState.tasks.map(task => (
          {
            ...task,
            completed: false,
          }
        )),
      }));
    } else {
      this.setState(prevState => ({
        tasks: prevState.tasks.map(task => (
          {
            ...task,
            completed: true,
          }
        )),
      }));
    }
  }

  toggleActiveTasks = (filterName) => {
    this.setState({ tasksToShow: filterName });
  }

  render() {
    const { tasks, tasksToShow } = this.state;
    const visibleTasks = this.filterTodos(tasksToShow);
    const filteringBtns = ['all', 'active', 'completed'];

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp addTask={this.addTask} />
        </header>

        <section className="main">
          <input
            checked={tasks.length > 0 && this.isAnyActiveTasks() === 0}
            onChange={this.toggleAllTasksCompleted}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            tasks={visibleTasks}
            toggleCompleteTask={this.toggleCompleteTask}
            deleteTask={this.deleteTask}
          />
        </section>

        <Footer
          tasks={tasks}
          filteringBtns={filteringBtns}
          tasksToShow={tasksToShow}
          clearCompleted={this.clearCompleted}
          toggleActiveTasks={this.toggleActiveTasks}
        />
      </section>
    );
  }
}

export default App;
