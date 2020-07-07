import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { Route, Switch } from 'react-router-dom';

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

  taskCounter = (isComplited = false) => {
    let counter = 0;

    this.state.todos.forEach((todo) => {
      if (todo.isCompleted === isComplited) {
        counter += 1;
      }
    });

    return counter;
  }

  todosFilter = (isComplited = false) => (
    this.state.todos.filter(todo => todo.isCompleted === isComplited)
  )

  render() {
    const activeTaskQuantity = this.taskCounter();
    const completedTaskQuantity = this.taskCounter(true);
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
          <Switch>
            <Route path="/" exact>
              <TodoList
                deleteTodo={this.deleteTodo}
                todos={this.state.todos}
                completeTodo={this.changeCompletement}
              />
            </Route>
            <Route path="/active">
              <TodoList
                deleteTodo={this.deleteTodo}
                todos={this.todosFilter()}
                completeTodo={this.changeCompletement}
              />
            </Route>
            <Route path="/completed">
              <TodoList
                deleteTodo={this.deleteTodo}
                todos={this.todosFilter(true)}
                completeTodo={this.changeCompletement}
              />
            </Route>
          </Switch>

          <ul className="todo-list">
            {/* <li>
            {/* <li className="editing">
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-3" />
                <label htmlFor="todo-3">zxcvbnm</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li>

            <li>
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-4" />
                <label htmlFor="todo-4">1234567890</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li> */}
          </ul>
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
