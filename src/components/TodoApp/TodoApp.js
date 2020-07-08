import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { Route } from 'react-router-dom';

import { TodoShapes } from '../../Shapes/TodoShapes';

import { AddForm } from '../AddForm/AddForm';
import { TodoList } from '../TodoList/TodoList';
import { TodoMenu } from '../TodoMenu/TodoMenu';
import { CompleteAllCheckbox }
  from '../CompleteAllCheckbox/CompleteAllCheckbox';

export class TodoApp extends React.Component {
  state = {
    todos: [...this.props.todos],
    allCompleted: this.props.todos.every(todo => (
      todo.isCompleted === true
    )),
    isCompleted: true,
  }

  createTodo = (value) => {
    this.setState({
      taskTitle: value,
    });
  }

  addTodo = (event) => {
    event.preventDefault();

    const newTodo = {
      id: this.state.todos.length + 1,
      title: this.state.taskTitle,
      isCompleted: false,
    };

    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        { ...newTodo },
      ],
    }));

    event.target.reset();
  }

  deleteTodo = (taskId) => {
    this.setState(prevState => (
      {
        todos: prevState.todos.filter(todo => todo.id !== taskId),
      }));
  }

  changeCompletement = (taskId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== taskId) {
          return todo;
        }

        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }),
    }));

    this.checkCompletement();
  }

  completeAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        isCompleted: !prevState.allCompleted,
      })),
      allCompleted: !prevState.allCompleted,
    }));
  }

  checkCompletement = () => {
    this.setState(prevState => ({
      allCompleted: prevState.todos.every(todo => (
        todo.isCompleted === true
      )),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => (
      {
        todos: prevState.todos.filter(todo => todo.isCompleted !== true),
      }));
  }

  taskCounter = (isComplited) => {
    let counter = 0;

    this.state.todos.forEach((todo) => {
      if (todo.isCompleted === isComplited) {
        counter += 1;
      }
    });

    return counter;
  }

  render() {
    const activeTaskQuantity = this.taskCounter(!this.state.isCompleted);
    const completedTaskQuantity = this.taskCounter(this.state.isCompleted);
    const taskQuantity = this.state.todos.length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <AddForm
            onChange={this.createTodo}
            onSubmit={this.addTodo}
          />
        </header>

        <section className="main">
          <CompleteAllCheckbox completeAll={this.completeAll} />
          <Route
            path="./"
            render={({ location }) => (
              <TodoList
                location={location}
                deleteTodo={this.deleteTodo}
                todos={this.state.todos}
                completeTodo={this.changeCompletement}
              />
            )}
          />

          {/* <ul className="todo-list">
            <li className="editing">
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-3" />
                <label htmlFor="todo-3">zxcvbnm</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li>
          </ul> */}
        </section>
        {taskQuantity
          ? (
            <footer className="footer">
              <TodoMenu
                activeTasks={activeTaskQuantity}
                clearCompleted={this.clearCompleted}
                completedTasks={completedTaskQuantity}
              />
            </footer>
          )
          : (<></>)
        }
      </section>
    );
  }
}

TodoApp.propTypes = {
  todos: PropTypes.arrayOf(shape(
    TodoShapes,
  )).isRequired,
};
