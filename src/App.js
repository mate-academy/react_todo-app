import React from 'react';
import { AddNewTaskField } from './components/AddBewTaskFiled/AddNewTaskField';
import { TasksList } from './components/TasksList/TasksList';
import { Footer } from './components/Footer/Footer';

function updateCurrentTaskCondition(
  prevInitialList,
  newTaskCondiniton,
  property,
) {
  return prevInitialList.map((taskObj) => {
    if (taskObj.id === newTaskCondiniton.id) {
      return property ? newTaskCondiniton[property] : newTaskCondiniton;
    }

    return property ? taskObj[property] : taskObj;
  });
}

class App extends React.Component {
  state = {
    initialTasksList: [],
    showCurrentTasks: 'all',
    toggleCompleted: false,
  };

  componentDidMount() {
    this.setState({
      initialTasksList:
        JSON.parse(localStorage.getItem('myData')) || [],
      toggleCompleted:
        JSON.parse(localStorage.getItem('myToggleCompleted')) || false,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem(
      'myData',
      JSON.stringify(this.state.initialTasksList),
    );
    localStorage.setItem(
      'myToggleCompleted',
      JSON.stringify(this.state.toggleCompleted),
    );
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
      initialTasksList:
        updateCurrentTaskCondition(
          prevState.initialTasksList,
          newTaskCondiniton,
        ),
      toggleCompleted:
        updateCurrentTaskCondition(
          prevState.initialTasksList,
          newTaskCondiniton,
          'completed',
        ).every(item => item) ? 1 : false,
    }));
  };

  updateShowCurrentTaskFlag = (newFlag) => {
    this.setState({
      showCurrentTasks: newFlag,
    });
  };

  toggleCompletedAll = () => {
    this.setState(prevState => ({
      initialTasksList: prevState.initialTasksList.map(task => ({
        ...task,
        completed: !prevState.toggleCompleted,
      })),
      toggleCompleted: !prevState.toggleCompleted,
    }));
  };

  clearCompleted = (clearTasksList) => {
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
                    onChange={this.toggleCompletedAll}
                    checked={this.state.toggleCompleted}
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
                  updateShowCurrentTaskFlag={this.updateShowCurrentTaskFlag}
                  clearCompleted={this.clearCompleted}
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
