import React from 'react';
import { uuid } from 'uuidv4';

import { TodoAppTypes } from '../Shapes/Shapes';
import { Input } from '../Input/Input';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export class TodoApp extends React.Component {
  state = {
    tasks: this.props.tasksFromServer,
    showOnlyCompleted: false,
    showOnlyActive: false,
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
    const { tasks, showOnlyCompleted, showOnlyActive } = this.state;

    const numberOfTask = tasks.length;

    return (
      <section className="todoapp">

        <Input addTask={this.addNewTask} />

        <TodoList
          tasks={tasks}
          showOnlyActive={showOnlyActive}
          showOnlyCompleted={showOnlyCompleted}
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
              showOnlyActive={showOnlyActive}
              showOnlyCompleted={showOnlyCompleted}
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
