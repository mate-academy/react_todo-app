import React from 'react';
import Footer from './Footer';
import TodoList from './TodoList';

class App extends React.Component {
  state = {
    tasks: [],
    currentFilter: 'All',
    title: '',
    currentIndex: 0,
  }

  writeTasks = (event) => {
    if (!this.state.title) {
      return;
    }

    event.preventDefault();
    this.setState(state => ({
      tasks: [...state.tasks, {
        title: state.title,
        completed: false,
        id: state.currentIndex,
      }],
      title: '',
      currentIndex: state.currentIndex + 1,
    }));
  }

  changeStatus = (taskId) => {
    const currentTask = this.state.tasks.find(task => task.id === taskId);

    currentTask.completed = !currentTask.completed;
    this.setState(state => ({
      tasks: [...state.tasks],
    }));
  }

  destroyTask = (taskId) => {
    this.setState(state => ({
      tasks: state.tasks.filter(task => task.id !== taskId),
    }));
  }

  completedAll = () => {
    this.setState(state => ({
      tasks: state.tasks.map(task => ({
        ...task,
        completed: !state.tasks.every(didAllTask => didAllTask.completed),
      })),
    }));
  }

  filterTodos = (filter) => {
    if (filter === 'All') {
      return this.state.tasks;
    }

    if (filter === 'Active') {
      return this.state.tasks.filter(task => !task.completed);
    }

    return this.state.tasks.filter(task => task.completed);
  }

  filterBy = (howToFilter) => {
    this.setState({
      currentFilter: howToFilter,
    });
  }

  clearCompletedAll = () => {
    this.setState(state => ({
      ...state,
      tasks: state.tasks.filter(task => !task.completed),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.writeTasks}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                });
              }}
            />
          </form>

        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.completedAll}
          />
          {/*  eslint-disable-next-line */ }
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <TodoList
              tasks={this.filterTodos(this.state.currentFilter)}
              changeStatus={this.changeStatus}
              destroyTask={this.destroyTask}
            />
          </ul>
        </section>
        <Footer
          tasks={this.state.tasks}
          filterBy={this.filterBy}
          currentFilter={this.state.currentFilter}
          clearCompletedAll={this.clearCompletedAll}
        />
      </section>
    );
  }
}

export default App;
