import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodosFilter from '../TodosFilters/TodosFilter';
import TodoList from '../TodoList/TodoList';

class TodoApp extends Component {
  state = {
    newTodo: '',
    activeFilter: 'all',
    todoList: [],
  }

  componentDidMount() {
    const previousSessionData = JSON.parse(localStorage.getItem('todoList'));

    if (previousSessionData) {
      this.setState({ todoList: previousSessionData });
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
    if (filterName === 'completed') {
      this.setState({ activeFilter: 'completed' });
    }

    if (filterName === 'active') {
      this.setState({ activeFilter: 'active' });
    }

    if (filterName === 'all') {
      this.setState({ activeFilter: 'all' });
    }
  }

  setAll = (val) => {
    this.setState(state => ({
      todoList: state.todoList.map(todo => ({
        ...todo,
        completed: val,
      })),
    }));
  }

  render() {
    const {
      todoList,
      newTodo,
      activeFilter,
    } = this.state;

    const activeTodoList = [];
    const completedTodoList = [];
    let filteredTodoList = [];

    todoList.forEach((todo) => {
      if (todo.completed) {
        completedTodoList.push(todo);
      } else {
        activeTodoList.push(todo);
      }
    });

    if (activeFilter === 'all') {
      filteredTodoList = [...todoList];
    }

    if (activeFilter === 'active') {
      filteredTodoList = [...activeTodoList];
    }

    if (activeFilter === 'completed') {
      filteredTodoList = [...completedTodoList];
    }

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
        <TodoList
          todoList={filteredTodoList}
          handleCompleteToggle={this.handleCompleteToggle}
          handleDeleteTodo={this.handleDeleteTodo}
          setAll={this.setAll}
          setNewTitle={this.setNewTitle}
        />
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
