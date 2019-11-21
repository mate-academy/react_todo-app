import React, { Component } from 'react';
import InputForm from './components/InputForm/InputForm';
import TodoItem from './components/TodoItem/TodoItem';
import Footer from './components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem('state')) || {
      todos: [],
      id: 1,
      showTodos: 'all',
      editTodoId: null,
      showEditField: false,
      task: '',
    };
  }

  componentDidUpdate() {
    const stateJson = JSON.stringify(this.state);

    localStorage.setItem('state', stateJson);
  }

  newItemSubmitted = (newItem) => {
    const item = {
      ...newItem,
      id: this.state.id,
      isActive: true,
    };

    this.setState(prev => ({
      todos: [
        ...prev.todos, item],
      id: prev.id + 1,
    }));
  }

  inputChanged = (event) => {
    this.setState({
      task: event.target.value,
    });
  }

  submitEditItem = (event, value) => {
    event.preventDefault();

    const newTask = {
      task: value,
    };

    this.onEditSubmitted(newTask);

    this.setState({
      task: '',
    });
  };

  onEditSubmitted = (newTask) => {
    this.setState(prev => ({
      todos: prev.todos.map(todo => (
        todo.id === prev.editTodoId
          ? { ...todo, task: newTask.task, isActive: true }
          : todo)),
      editTodoId: null,
      showEditField: false,
    }));
  }

  filterTodos = () => this.state.todos.filter((todo) => {
    switch (this.state.showTodos) {
      case 'all':
        return true;
      case 'completed':
        return !todo.isActive;
      case 'active':
        return todo.isActive;
      default:
        return true;
    }
  });

  setActive = (todoId, status) => {
    this.setState(prev => ({
      ...prev,
      todos: prev.todos.map(todo => (todo.id !== todoId
        ? todo
        : { ...todo, isActive: status })),
    }));
  };

  onButtonSelected = (type) => {
    this.setState({
      showTodos: type,
    });
  }

  deleteTodo = (id) => {
    this.setState(prev => ({
      todos: prev.todos.filter(todo => todo.id !== id),
    }));
  }

  deleteSelectedTodo = () => {
    this.setState(prev => ({
      todos: prev.todos.filter(todo => todo.isActive),
    }));
  }

  selectAll = () => {
    this.setState((prev) => {
      const allCompleted = prev.todos.every(todo => !todo.isActive);

      return {
        ...prev,
        todos: prev.todos.map(todo => ({ ...todo, isActive: allCompleted })),
      };
    });
  }

  editTodo = (id) => {
    this.setState({
      showEditField: true,
      editTodoId: id,
    });
  }

  onFocusChanged = () => {
    this.setState({
      showEditField: false,
      editTodoId: null,
    });
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <InputForm
            todos={this.state.todos}
            onSubmitted={this.newItemSubmitted}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={this.state.todos.length
              ? this.state.todos.every(todo => !todo.isActive)
              : false}
            id="toggle-all"
            className="toggle-all"
            onChange={this.selectAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {this.filterTodos().map(todo => (
              <TodoItem
                todo={todo}
                key={todo.id}
                deleteTodo={this.deleteTodo}
                setActive={this.setActive}
                editTodo={this.editTodo}
                showEditField={this.state.showEditField}
                editTodoId={this.state.editTodoId}
                submitEditItem={this.submitEditItem}
                task={this.state.task}
                inputChanged={this.inputChanged}
                onFocusChanged={this.onFocusChanged}
              />
            ))}
          </ul>
        </section>

        <Footer
          todos={this.state.todos}
          showButton={this.state.showButton}
          deleteSelectedTodo={this.deleteSelectedTodo}
          onButtonSelected={this.onButtonSelected}
          filterTodos={this.filterTodos}
          active={this.state.showTodos}
        />
      </section>
    );
  }
}

export default App;
