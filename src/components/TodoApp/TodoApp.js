import React from 'react';

import { TodoAppTypes } from '../Shapes/Shapes';
import { Input } from '../Input/Input';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export class TodoApp extends React.Component {
  state = {
    tasks: this.props.tasksFromServer,
    tab: 'all',
  }

  componentDidMount() {
    const localState = JSON.parse(localStorage.getItem('todoApp'));

    if (localState) {
      this.setState({ ...localState });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todoApp', JSON.stringify(this.state));
  }

  addNewTask = (newTask) => {
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
    }));
  }

  changeCurrentTask = (title, id) => {
    if (title === '') {
      return;
    }

    this.setState(prevState => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title,
          };
        }

        return task;
      }),
    }));
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

  toggleTask = (event) => {
    const { name } = event.target;

    switch (name) {
      case 'active':
        this.setState({
          tab: 'active',
        });
        break;
      case 'completed':
        this.setState({
          tab: 'completed',
        });
        break;
      default: this.setState({
        tab: 'all',
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
    const { checked } = event.target;

    this.setState(prevState => ({
      tasks: prevState.tasks.map(task => ({
        ...task,
        completed: checked,
      })),
    }));
  }

  render() {
    const { tasks, tab } = this.state;

    const numberOfTask = tasks.length;

    return (
      <section className="todoapp">

        <Input addTask={this.addNewTask} />

        <TodoList
          tasks={tasks}
          tab={tab}
          toggle={this.toggleCheck}
          onDeleted={this.deleteTask}
          onAllSelected={this.selectAllAsCompleted}
          onChangeCurrentTask={this.changeCurrentTask}
        />

        {(numberOfTask)
          ? (
            <TodosFilter
              tasks={tasks}
              onToggleTask={this.toggleTask}
              tab={tab}
              onClear={this.clearCompletedTasks}
            />
          )
          : ''}

      </section>
    );
  }
}

TodoApp.propTypes = TodoAppTypes;

TodoApp.defaultProps = {
  tasks: [],
};
