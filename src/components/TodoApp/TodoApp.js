import React from 'react';
import { TodoList } from '../TodoList/TodoList';
import { AddNewTodo } from '../AddNewTodo/AddNewTodo';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export class TodoApp extends React.Component {
  state = {
    todoList: [],
    lastTodoId: 0,
    viewStatus: 'All',
    isSomeCompleted: false,
  }

  addNewTodo = (newTodo) => {
    this.setState(state => (
      {
        todoList: [...state.todoList, newTodo],
        lastTodoId: state.lastTodoId + 1,
      }
    ));
  }

  checkIfSomeCompleted = () => {
    this.setState(state => ({
      isSomeCompleted: state.todoList.some(todo => todo.completed),
    }));
  }

  handleToggleStatus = (id) => {
    this.setState(state => ({
      todoList: state.todoList.map((todo) => {
        if (todo.id === id) {
          this.checkIfSomeCompleted();

          return ({
            ...todo,
            completed: !todo.completed,
          });
        }

        return todo;
      }),
    }));
  }

  handleToggleAll = () => {
    const isCompleted = this.state.todoList.some(todo => !todo.completed);

    this.setState(state => (
      {
        todoList: [...state.todoList.map(todo => (
          {
            ...todo,
            completed: isCompleted,
          }
        ))],
      }
    ));

    this.checkIfSomeCompleted();
  }

  handleChangeViewStatus = (status) => {
    this.setState({
      viewStatus: status,
    });
  }

  filterTodoList = () => {
    if (this.state.viewStatus === 'Active') {
      return this.state.todoList.filter(todo => !todo.completed);
    }

    if (this.state.viewStatus === 'Completed') {
      return this.state.todoList.filter(todo => todo.completed);
    }

    return this.state.todoList;
  }

  removeTodoItem = (id) => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => todo.id !== id),
    }));
  }

  clearCompletedTodos = () => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => !todo.completed),
    }));

    this.checkIfSomeCompleted();
  }

  render() {
    const { lastTodoId, todoList, viewStatus, isSomeCompleted } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <AddNewTodo lastTodoId={lastTodoId} addNewTodo={this.addNewTodo} />
        </header>

        <section className="main">
          {(todoList.length > 0) && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onClick={this.handleToggleAll}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )}

          <TodoList
            todoList={this.filterTodoList()}
            handleToggleStatus={this.handleToggleStatus}
            removeTodoItem={this.removeTodoItem}
          />
        </section>

        { (todoList.length > 0) && (
          <footer className="footer">
            <span className="todo-count">
              {todoList.filter(todo => !todo.completed).length}
              {' '}
              items left
            </span>

            <TodosFilter
              viewStatus={viewStatus}
              handleChangeViewStatus={this.handleChangeViewStatus}
            />

            { isSomeCompleted && (
              <button
                type="button"
                className="clear-completed"
                onClick={this.clearCompletedTodos}
              >
                Clear completed
              </button>
            )}

          </footer>
        )}
      </section>
    );
  }
}
