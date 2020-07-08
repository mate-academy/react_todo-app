import React from 'react';
import { uuid } from 'uuidv4';
import tasksFromServer from './api/tasks.json';
import { TodoApp } from './components/TodoApp/TodoApp';

export class App extends React.Component {
  state={
    tasks: tasksFromServer,
  }

  addNewTask = (title) => {
    const newTask = {
      title,
      id: uuid(),
      completed: false,
    };

    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
    }));
  }

  toggleCheck = (event) => {
    const id = event.target.value;

    this.setState((prevState) => {
      const current = prevState.tasks.map((task) => {
        if (task.id === Number(id)) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      });

      return { tasks: current };
    });
  }

  getOnlyActive = () => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.completed === false),
    }));
  }

  getOnlyCompleted = () => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.completed === true),
    }));
  }

  deleteTask = (event) => {
    const currentID = Number(event.target.value);

    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== currentID),
    }));
  }

  clearTasks = () => {
    this.setState({
      tasks: [],
    });
  }

  selectAllAsCompleted = (event) => {
    const isChecked = event.target.checked;

    // this.setState(prevState => ({
    //   tasks: prevState.tasks.map((task) => {
    //     return {
    //       ...task,
    //       completed: isChecked,
    //     };
    //   }),
    // }));
    this.setState((prevState) => {
      const currentTasks = prevState.tasks.map((task) => {
        return {
          ...task,
          completed: isChecked,
        };
      });

      return { tasks: currentTasks };
    });
  }

  // editTask = (event) => {
  //   const isDoubleClicked = event.target.value;
  //   // console.log(isDoubleClicked);
  // }

  render() {
    const { tasks } = this.state;
    // console.log(tasks);

    return (
      <TodoApp
        tasks={tasks}
        addTask={this.addNewTask}
        toggle={this.toggleCheck}
        onActive={this.getOnlyActive}
        onCompleted={this.getOnlyCompleted}
        onDeleted={this.deleteTask}
        onClear={this.clearTasks}
        onAllSelected={this.selectAllAsCompleted}
        onEditTask={this.editTask}
      />
    );
  }
}

export default App;
