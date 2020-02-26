import React from 'react';
import { AddNewTaskField } from './components/AddBewTaskFiled/AddNewTaskField';
import { TasksList } from './components/TasksList/TasksList';
import { Footer } from './components/Footer/Footer';

class App extends React.Component {
  state = {
    initialTasksList: JSON.parse(localStorage.getItem('myData')) || [],
    showCurrentTasks: 'all',
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem('myData', JSON.stringify(this.state.initialTasksList));
  }

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

        {
          this.state.initialTasksList.length
            ? (
              <>
                <section className="main">
                  <input
                    type="checkbox"
                    id="toggle-all"
                    className="toggle-all"
                  />
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
              </>
            )
            : null
        }

      </section>
    );
  }
}

export default App;
