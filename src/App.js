import React from 'react';
import { AddNewTaskField } from './components/AddBewTaskFiled/AddNewTaskField';
import { TasksList } from './components/TasksList/TasksList';
import { Footer } from './components/Footer/Footer';

const initialTasks = [
  {
    id: '1',
    value: 'task-1',
    completed: false,
  },
  {
    id: '2',
    value: 'task-2',
    completed: true,
  },
];

class App extends React.Component {
  state = {
    initialTasksList: initialTasks,
    showCurrentTasks: 'all',
  };

  updateInitialTasks = (newTasksItem) => {
    this.setState(prevState => ({
      initialTasksList: [
        ...prevState.initialTasksList,
        newTasksItem,
      ],
    }));
  };

  updateTasksCondition = (newTaskCondiniton) => {
    this.setState(prevState => ({
      initialTasksList: prevState.initialTasksList.map((taskObj) => {
        if (taskObj.id === newTaskCondiniton.id) {
          return newTaskCondiniton;
        }

        return taskObj;
      }),
    }));
  };

  updateShowCurrentTaslFlag = (newFlag) => {
    this.setState({
      showCurrentTasks: newFlag,
    });
  };

  clearComplited = (clearTasksList) => {
    this.setState({
      initialTasksList: clearTasksList,
    });
  };

  deleteTask = (deletedTask) => {
    this.setState(prevState => ({
      initialTasksList: prevState.initialTasksList
        .filter(task => task.id !== deletedTask.id),
    }));
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <AddNewTaskField
            updateInitialTasks={this.updateInitialTasks}
          />

        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TasksList
            initialTasksList={this.state.initialTasksList}
            showCurrentTasks={this.state.showCurrentTasks}
            updateTasksCondition={this.updateTasksCondition}
            deleteTask={this.deleteTask}
          />
        </section>

        <Footer
          initialTasksList={this.state.initialTasksList}
          showCurrentTasks={this.state.showCurrentTasks}
          updateShowCurrentTaslFlag={this.updateShowCurrentTaslFlag}
          clearComplited={this.clearComplited}
        />

      </section>
    );
  }
}

export default App;
