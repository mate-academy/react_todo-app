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
    filtrationType: '',
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
      case 'active':
        return this.state.todos.filter(task => !task.completed);

      case 'completed':
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
    const tasksListLength = this.state.todos.length;

    return (
      <section className="todoapp">
        <NewTask
          handleSubmit={this.handleSubmit}
        />
        {tasksListLength !== 0 && (
          <TodoList
            checkAllTasks={this.checkAllTasks}
            todosList={this.filterByPattern()}
            handleTaskRemover={this.handleTaskRemover}
            statusHandler={this.statusHandler}
            updateTask={this.updateTask}

          />
        )}
        {tasksListLength !== 0 && (
          <TodosFilter
            activeTasksCounter={this.activeTasksCounter}
            filterSelector={this.filterSelector}
            clearButtonStatus={this.getClearButtonStatus()}
            removeCheckedTasks={this.removeCheckedTasks}
          />
        ) }
      </section>
    );
  }
}

export default App;
