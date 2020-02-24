import React from 'react';
import { AddNewTaskField } from './components/AddBewTaskFiled/AddNewTaskField';
import { TasksList } from './components/TasksList/TasksList';

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
    showCurrentTasks: null,
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

          {/*<ul className="todo-list">*/}
          {/*  <li>*/}
          {/*    <div className="view">*/}
          {/*      <input type="checkbox" className="toggle" id="todo-1" />*/}
          {/*      <label htmlFor="todo-1">asdfghj</label>*/}
          {/*      <button type="button" className="destroy" />*/}
          {/*    </div>*/}
          {/*    <input type="text" className="edit" />*/}
          {/*  </li>*/}
          {/*  <li className="completed">*/}
          {/*    <div className="view">*/}
          {/*      <input type="checkbox" className="toggle" id="todo-2" />*/}
          {/*      <label htmlFor="todo-2">qwertyuio</label>*/}
          {/*      <button type="button" className="destroy" />*/}
          {/*    </div>*/}
          {/*    <input type="text" className="edit" />*/}
          {/*  </li>*/}

          {/*  <li className="editing">*/}
          {/*    <div className="view">*/}
          {/*      <input type="checkbox" className="toggle" id="todo-3" />*/}
          {/*      <label htmlFor="todo-3">zxcvbnm</label>*/}
          {/*      <button type="button" className="destroy" />*/}
          {/*    </div>*/}
          {/*    <input type="text" className="edit" />*/}
          {/*  </li>*/}

          {/*  <li>*/}
          {/*    <div className="view">*/}
          {/*      <input type="checkbox" className="toggle" id="todo-4" />*/}
          {/*      <label htmlFor="todo-4">1234567890</label>*/}
          {/*      <button type="button" className="destroy" />*/}
          {/*    </div>*/}
          {/*    <input type="text" className="edit" />*/}
          {/*  </li>*/}
          {/*</ul>*/}
        </section>

        {/*<footer className="footer">*/}
        {/*  <span className="todo-count">*/}
        {/*    3 items left*/}
        {/*  </span>*/}

        {/*  <ul className="filters">*/}
        {/*    <li>*/}
        {/*      <a href="#/" className="selected">All</a>*/}
        {/*    </li>*/}

        {/*    <li>*/}
        {/*      <a href="#/active">Active</a>*/}
        {/*    </li>*/}

        {/*    <li>*/}
        {/*      <a href="#/completed">Completed</a>*/}
        {/*    </li>*/}
        {/*  </ul>*/}

        {/*  <button type="button" className="clear-completed">*/}
        {/*    Clear completed*/}
        {/*  </button>*/}
        {/*</footer>*/}
      </section>
    );
  }

}

export default App;
