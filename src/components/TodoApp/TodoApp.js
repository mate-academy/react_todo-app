import React from 'react';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';
// import { jsxIdentifier } from '@babel/types';

export default class TodoApp extends React.Component {
  state = {
    todos: [],
    // eslint-disable-next-line react/no-unused-state
    todosToShow: 'all',
  }

  addTodo = (todo) => {
    if (todo.text !== '') {
      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        todos: [todo, ...this.state.todos],
      });
    }
  };

  handleDelete = (id) => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  }

  toggleComplete = (id) => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          // suppose to update
          return {
            ...todo,
            complete: !todo.complete,
          };
        }

        return todo;
      }),
    });
    // console.log(this.state.todos);
  };

  lengthOfTodos = () => (
    this.state.todos.filter(todo => todo.complete === false).length
  )

  render() {
    // eslint-disable-next-line no-unused-vars
    let todos = [];

    if (this.state.todoToShow === 'all') {
      todos = [...this.state.todos];
    } else if (this.state.todoToShow === 'active') {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todoToShow === 'complete') {
      todos = this.state.todos.filter(todo => todo.complete);
    }

    return (
      <section className="todoapp">
        <TodoForm className="header" onSubmit={this.addTodo} />
        {JSON.stringify(this.state.todos)}
        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          {/* <label htmlFor="toggle-all">Mark all as complete</label> */}
          <ul className="todo-list">
            {this.state.todos.map(todo => (
              <Todo
                todos={this.state.todos}
                key={todo.id}
                text={todo.text}
                toDelete={() => this.handleDelete(todo.id)}
                toggleComplete={() => this.toggleComplete(todo.id)}
              />
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${this.lengthOfTodos()} items left`}
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
          />
        </footer>

        {/* <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <li className="">
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-1" />
                <label htmlFor="todo-1">sdfsdfsdf</label>
                <button type="button" className="destroy" />
              </div>
            </li>
          </ul>

        </section> */}
        {/*
        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            3 items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
          />
        </footer> */}
      </section>
    );
  }
}
