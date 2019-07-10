import React from 'react';
import Header from "./Header";
import TodoList from './TodoList';
import TodoListFooter from './TodoListFooter';
import PropTypes from 'prop-types';

class TodoApp extends React.Component {
  state = {
    todos: [],
    currentTaskId: 0,
    currentFilter: 'all',
    allTasksIsSelected: false,
  };

  addTask = (task) => {
    this.setState((prevState) => {
      const key = prevState.currentTaskId;

      return {
        todos: [...prevState.todos, {
          description: task.value,
          id: key,
          completed: false,
          inputMode: false,
          toggleStatus: () => this.toggleTaskProp(key, 'completed'),
          changeDescription: e => this.changeTaskDescription(e, key),
          toggleInputMode: () => this.toggleTaskProp(key, 'inputMode'),
          remove: () => this.removeTask(key),
        }],
        currentTaskId: key + 1,
      };
    }, () => {
      task.value = '';
    });
  };

  changeFilter = (filter) => {
    this.setState({
      currentFilter: filter,
    });
  };

  filterTasks = (task, filter) => {
    const { completed } = task;
    switch (filter) {
      case 'active': return completed === false;
      case 'completed': return completed === true;
      default: return true;
    }
  };

  removeTask = (key) => {
    this.setState((prevState) => {
      const taskIndex = prevState.todos
        .findIndex(currentTask => currentTask.id === key);
      prevState.todos.splice(taskIndex, 1);

      return {
        todos: prevState.todos,
      };
    });
  };

  removeSelectedTasks = (tasks) => {
    tasks.forEach(task => this.removeTask(task.id));
  };

  selectAllTasks = () => {
    this.setState((prevState) => {
      const currentStatus = prevState.allTasksIsSelected;
      return {
        todos: prevState.todos.map(task => ({
          ...task,
          completed: !currentStatus,
        })),
        allTasksIsSelected: !currentStatus,
      };
    });
  };

  changeTaskDescription = (description, taskId) => {
    if (!description) {
      this.removeTask(taskId);
    } else {
      this.setState((prevState) => {
        const task = prevState.todos
          .find(currentTask => currentTask.id === taskId);
        task.description = description;

        return {
          todos: prevState.todos,
        };
      });
    }
  };

  toggleTaskProp(key, prop) {
    this.setState((prevState) => {
      const task = prevState.todos.find(currentTask => currentTask.id === key);
      task[prop] = !task[prop];

      return {
        todos: prevState.todos,
      };
    });
  }

  render() {
    const { currentFilter, todos } = this.state;
    const unfinishedTasks = [];
    const finishedTasks = [];
    todos.forEach(task => (task.completed
      ? finishedTasks.push(task)
      : unfinishedTasks.push(task)));

    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        {todos.length > 0
        && (
          <>
            <TodoList
              filter={currentFilter}
              todos={todos}
              filterTasks={this.filterTasks}
              selectAll={this.selectAllTasks}
              changeFilter={this.changeFilter}
              finishedTasks={finishedTasks}
            />
            <TodoListFooter
              finishedTasks={finishedTasks}
              unfinishedTasks={unfinishedTasks}
              changeFilter={this.changeFilter}
              currentFilter={currentFilter}
              removeSelectedTasks={this.removeSelectedTasks}
            />
          </>
        )}
      </section>
    );
  }
}

export default TodoApp;
