import React from 'react';
// import { Header } from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { FILTERS } from './components/helpers/HELPERS';

class App extends React.Component {
  state = {
    tasks: [],
    tasksToShow: 'all',
    filters: FILTERS,
  };

  addTask = (taskName) => {
    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        {
          id: prevState.tasks.length !== 0 ? prevState.tasks.length : 0,
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
        {/* <Header /> */}
        <header className="header">
          <h1>todos</h1>
          <AddTodo addTask={this.addTask} />
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
          countActiveTAsks={this.countActiveTAsks}
        />
      </section>
    );
  }
}

export default App;
