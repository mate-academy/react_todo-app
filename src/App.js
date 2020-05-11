import React from 'react';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import TodosFilter from './components/TodosFilter';

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

  // filter starts!!!!!!!!!!!!!!!!!!!!!!
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

  toggleActiveTasks = (filterName) => {
    this.setState({ tasksToShow: filterName });
  }
  // filter ends !!!!!!!!!!!!!!!!!!!!

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
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            // checked={tasks.every(task => task.completed)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            tasks={visibleTasks}
            toggleCompleteTask={this.toggleCompleteTask}
            deleteTask={this.deleteTask}
          />

        </section>

        <footer className="footer">
          <span className="todo-count">
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            {tasks.filter(task => task.completed === false).length} items left
          </span>
          {/* <TodosFilter /> */}

          {/* above or below only */}

          <ul className="filters">
            {filteringBtns.map(filter => (
              <TodosFilter
                tasksToShow={tasksToShow}
                key={filter}
                actualFilter={filter}
                toggleActiveTasks={this.toggleActiveTasks}
              />
            ))}
            {/* <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li> */}
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
