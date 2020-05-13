import React, { Component } from 'react';
import TodoApp from './components/TodoApp/TodoApp';
import TodoList from './components/TodoList/TodoList';
import TodosFilter from './components/TodosFilter/TodosFilter';

class App extends Component {
  state = {
    tasks: [],
    tasksToShow: 'all',
  }

  addTask = (taskName) => {
    this.setState(prevState => ({
      ...prevState,
      tasks: [...prevState.tasks, {
        id: prevState.tasks.length,
        title: taskName,
        completed: false,
      }],
    }));
  };

  changeCondition = (id) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      }),
    }));
  };

  deleteTask = (id) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => (
        task.id !== id
      )),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.completed === false),
    }));
  }

  markAllAsCompleted= () => {
    if (this.state.tasks.filter(t => t.completed === false).length) {
      this.setState(prevState => ({
        tasks: prevState.tasks.map(task => ({
          ...task,
          completed: true,
        })),
      }));
    } else {
      this.setState(prevState => ({
        tasks: prevState.tasks.map(task => ({
          ...task,
          completed: false,
        })),
      }));
    }
  }

  filterTasks = (whichTasksToShow) => {
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

  switchActiveTasks = (filterName) => {
    this.setState({ tasksToShow: filterName });
  }

  render() {
    const { tasks, tasksToShow } = this.state;
    const visibleTasks = this.filterTasks(tasksToShow);
    const filerNames = ['all', 'active', 'completed'];

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoApp addTask={this.addTask} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            disabled={!tasks.length}
            checked={
              (!tasks.length
              || this.state.tasks.filter(t => t.completed === false).length > 0)
                ? ''
                : 'checked'}
            onClick={this.markAllAsCompleted}
           />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            tasks={visibleTasks}
            changeCondition={this.changeCondition}
            deleteTask={this.deleteTask}
          />
        </section>

        <footer className="footer" hidden={!tasks.length}>
          <span className="todo-count">
            {tasks.filter(t => t.completed === false).length}
            <span>  items left</span>

          </span>

          <ul className="filters">
            {filerNames.map(filter => (
              <TodosFilter
                tasksToShow={tasksToShow}
                key={filter}
                actualFilter={filter}
                switchActiveTasks={this.switchActiveTasks}
              />
            ))}
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearCompleted}

          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
