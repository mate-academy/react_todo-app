import React from 'react';
import NewTask from './Components/NewTask/NewTask';
import TodoList from './Components/TodoList/TodoList';
import TodosFilter from './Components/TodosFilter/TodosFilter';

const tasksArr = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : [];

class App extends React.Component {
  state = {
    todos: [...tasksArr],
    filtrationType: 'All',
  }

  componentDidUpdate() {
    const { todos } = this.state;

    localStorage.setItem('todos', JSON.stringify(todos));
  }

  handleSubmit = (newTask) => {
    this.setState(prev => ({
      todos: [...prev.todos, newTask],
    }));
  }

  statusHandler = (taskId) => {
    this.setState(prev => ({
      todos: prev.todos.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      }),
    }));
  }

  filterSelector = (filterType) => {
    this.setState({ filtrationType: filterType });
  }

  filterByPattern = () => {
    switch (this.state.filtrationType) {
      case 'Active':
        return this.state.todos.filter(task => !task.completed);

      case 'Completed':
        return this.state.todos.filter(task => task.completed);

      default:
        return this.state.todos;
    }
  }

  activeTasksCounter = () => this.state.todos
    .filter(task => !task.completed).length

  handleTaskRemover = (taskId) => {
    this.setState(prev => ({
      todos: prev.todos.filter(task => +taskId !== task.id),
    }));
  }

  removeCheckedTasks = () => {
    this.setState(prev => ({
      todos: [...prev.todos].filter(task => !task.completed),
    }));
  }

  getClearButtonStatus = () => this.state.todos.some(task => task.completed)

  checkAllTasks = (clicks) => {
    if (clicks % 2 === 0) {
      this.setState(prev => ({
        todos: [...prev.todos].map(task => ({
          ...task,
          completed: false,
        })),
      }));
    } else {
      this.setState(prev => ({
        todos: [...prev.todos].map(task => ({
          ...task,
          completed: true,
        })),
      }));
    }
  }

  updateTask = (data, id) => {
    this.setState(prev => ({
      todos: prev.todos.map((task) => {
        if (task.id === +id) {
          return {
            ...task,
            title: data,
          };
        }

        return task;
      }),
    }));
  }

  render() {
    const { filtrationType, todos } = this.state;
    const tasksListLength = todos.length;

    return (
      <section className="todoapp">
        <NewTask
          handleSubmit={this.handleSubmit}
        />
        {todos.length > 0 && (
          <TodoList
            checkAllTasks={this.checkAllTasks}
            todosList={this.filterByPattern()}
            handleTaskRemover={this.handleTaskRemover}
            statusHandler={this.statusHandler}
            updateTask={this.updateTask}

          />
        )}
        {todos.length > 0 && (
          <TodosFilter
            activeTasksCounter={this.activeTasksCounter}
            filterSelector={this.filterSelector}
            clearButtonStatus={this.getClearButtonStatus()}
            removeCheckedTasks={this.removeCheckedTasks}
            activeFilter={filtrationType}
          />
        ) }
      </section>
    );
  }
}

export default App;
