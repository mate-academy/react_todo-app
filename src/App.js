import React from 'react';
import { Header } from './components/Header';
import Footer from './components/Footer';
import { FILTERS } from './components/helpers/HELPERS';

class App extends React.Component {
  state = {
    tasks: [],
    tasksToShow: 'all',
    filters: FILTERS,
    counterID: 1,
  };

  addTask = (taskName) => {
    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        {
          id: setTimeout(() => prevState.counterID + 1, 0),
          // id: prevState.tasks.length !== 0 ? prevState.tasks.length : 0,
          title: taskName,
          completed: false,
        },
      ],
    }));
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
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== id),
      counterID: prevState.counterID - 1,
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.completed === false),
    }));
  }

  filterTodos = (whichTasksToShow) => {
    const { tasks, filters } = this.state;

    switch (whichTasksToShow) {
      case filters.active:
        return tasks.filter(task => !task.completed);

      case filters.completed:
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

  countActiveTAsks = () => this.state.tasks
    .filter(task => task.completed === false).length;

  render() {
    const { tasks, tasksToShow } = this.state;
    const visibleTasks = this.filterTodos(tasksToShow);
    const filteringBtns = ['all', 'active', 'completed'];

    return (
      <section className="todoapp">
        <Header
          addTask={this.addTask}
          tasks={tasks}
          toggleAllTasksCompleted={this.toggleAllTasksCompleted}
          isAnyActiveTasks={this.isAnyActiveTasks}
          visibleTasks={visibleTasks}
          toggleCompleteTask={this.toggleCompleteTask}
          deleteTask={this.deleteTask}
        />

        <Footer
          tasks={tasks}
          filteringBtns={filteringBtns}
          tasksToShow={tasksToShow}
          clearCompleted={this.clearCompleted}
          toggleActiveTasks={this.toggleActiveTasks}
          countActiveTAsks={this.countActiveTAsks}
        />
      </section>
    );
  }
}

export default App;
