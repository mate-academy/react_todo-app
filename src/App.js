import React from 'react';
import { uuid } from 'uuidv4';
import tasksFromServer from './api/tasks.json';
import { TodoApp } from './components/TodoApp/TodoApp';

export class App extends React.Component {
  state={
    tasks: tasksFromServer,
    showOnlyCompleted: false,
    showOnlyActive: false,
  }

  addNewTask = (title) => {
    const newTask = {
      title,
      id: uuid(),
      completed: false,
      isEdited: false,
    };

    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
    }));
  }

  changeCurrentTask = (title, id, keyCode) => {
    if (keyCode === 13) {
      this.setState(prevState => ({
        tasks: prevState.tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              title,
              isEdited: false,
            };
          }

          return task;
        }),
      }));
    }

    if (keyCode === 27 || !keyCode) {
      this.setState(prevState => ({
        tasks: prevState.tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              isEdited: false,
            };
          }

          return task;
        }),
      }));
    }
  }

  toggleCheck = (event) => {
    const id = event.target.value;

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
  }

  editTask = (event) => {
    const currentId = event.currentTarget.getAttribute('value');

    this.setState(prevState => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === currentId) {
          return {
            ...task,
            isEdited: !task.isEdited,
          };
        }

        return task;
      }),
    }));
  }

  toggleTask = (event) => {
    const onToggleTask = event.target.name;

    switch (onToggleTask) {
      case 'active':
        this.setState({
          showOnlyCompleted: false,
          showOnlyActive: true,
        });
        break;
      case 'completed':
        this.setState({
          showOnlyCompleted: true,
          showOnlyActive: false,
        });
        break;
      default: this.setState({
        showOnlyCompleted: false,
        showOnlyActive: false,
      });
    }
  }

  deleteTask = (event) => {
    const currentID = event.target.value;

    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== currentID),
    }));
  }

  clearCompletedTasks = () => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.completed === false),
    }));
  }

  selectAllAsCompleted = (event) => {
    const isChecked = event.target.checked;

    this.setState(prevState => ({
      tasks: prevState.tasks.map(task => ({
        ...task,
        completed: isChecked,
      })),
    }));
  }

  render() {
    const { tasks, showOnlyActive, showOnlyCompleted } = this.state;

    return (
      <TodoApp
        tasks={tasks}
        showOnlyActive={showOnlyActive}
        showOnlyCompleted={showOnlyCompleted}
        addTask={this.addNewTask}
        toggle={this.toggleCheck}
        onToggleTask={this.toggleTask}
        onDeleted={this.deleteTask}
        onClear={this.clearCompletedTasks}
        onAllSelected={this.selectAllAsCompleted}
        onEdit={this.editTask}
        onChangeCurrentTask={this.changeCurrentTask}
      />
    );
  }
}

export default App;
