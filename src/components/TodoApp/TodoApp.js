import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FILTERS } from '../../constants/index';
import TodosFilter from '../TodosFilters/TodosFilter';
import TodoList from '../TodoList/TodoList';

class TodoApp extends Component {
  state = {
    newTodo: '',
    activeFilter: FILTERS.all,
    toggleAll: false,
    todoList: [],
  }

  componentDidMount() {
    const { todoList } = this.state;
    const previousSessionData = JSON.parse(localStorage.getItem('todoList'));

    if (previousSessionData) {
      this.setState({ todoList: previousSessionData });
    }

    if (todoList.every(({ completed }) => completed)) {
      this.setAll(true);
      this.setState({ toggleAll: true });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
  }

  handleCompleteToggle = (todoId) => {
    this.setState(state => ({
      todoList: state.todoList.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  handleDeleteTodo = (todoId) => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => todo.id !== todoId),
    }));
  }

  handleNewTodoChange = (e) => {
    this.setState({
      newTodo: e.target.value,
    });
  }

  handleClearCompleted = () => {
    this.setState(state => ({
      todoList: state.todoList.filter(({ completed }) => !completed),
    }));
  }

  handleNewTodoEnter = (e) => {
    if (e.key === 'Enter') {
      this.addNewTodo();
    }
  }

  setNewTitle = (id, newTitle) => {
    this.setState(state => ({
      todoList: state.todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTitle,
          };
        }

        return todo;
      }),
    }));
  }

  addNewTodo = () => {
    if (this.state.newTodo.trim().length !== 0) {
      this.setState(state => ({
        todoList: [
          ...state.todoList,
          {
            id: uuidv4(),
            title: state.newTodo,
            completed: false,
          },
        ],
        newTodo: '',
      }));
    } else {
      this.setState({ newTodo: '' });
    }
  }

  filterTodoList = (filterName) => {
    if (filterName === FILTERS.completed) {
      this.setState({ activeFilter: FILTERS.completed });
    }

    if (filterName === FILTERS.active) {
      this.setState({ activeFilter: FILTERS.active });
    }

    if (filterName === FILTERS.all) {
      this.setState({ activeFilter: FILTERS.all });
    }
  }

  setAll = (val) => {
    this.setState(state => ({
      todoList: state.todoList.map(todo => ({
        ...todo,
        completed: val,
      })),
      toggleAll: val,
    }));
  }

  render() {
    const {
      todoList,
      newTodo,
      activeFilter,
      toggleAll,
    } = this.state;

    const preparedTodos = todoList.filter((todo) => {
      if (activeFilter === FILTERS.active) {
        return !todo.completed;
      }

      if (activeFilter === FILTERS.completed) {
        return todo.completed;
      }

      return todo;
    });

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            value={newTodo}
            onChange={this.handleNewTodoChange}
            onBlur={this.addNewTodo}
            onKeyUp={this.handleNewTodoEnter}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </header>
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={() => this.setAll(!toggleAll)}
            checked={toggleAll}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>
          <TodoList
            todoList={preparedTodos}
            handleCompleteToggle={this.handleCompleteToggle}
            handleDeleteTodo={this.handleDeleteTodo}
            setNewTitle={this.setNewTitle}
          />
        </section>
        {todoList.length > 0 && (
          <TodosFilter
            todoList={todoList}
            filterTodoList={this.filterTodoList}
            handleClearCompleted={this.handleClearCompleted}
          />
        )}
      </section>
    );
  }
}

export default TodoApp;
