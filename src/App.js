import React from 'react';
import NewTodo from './Components/NewTodo/NewTodo';
import TodoList from './Components/TodoList/TodoList';
import TodosFilter from './Components/TodosFilter/TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    originalTodos: [],
    buttonSelected: 'all',
  }

  handleAddNewTodo = (todo) => {
    if (todo.title.length > 0) {
      this.setState(prevState => ({
        todos: [...prevState.todos, todo],
        originalTodos: [...prevState.originalTodos, todo],
      }));
    }

    this.handleButtonChange(this.state.buttonSelected);
  }

  handleDoubleClickEditTitle = (filmTitle, todoId) => {
    this.setState(prevState => ({
      todos: [...prevState.todos]
        .map(todo => (
          todo.id === todoId
            ? { ...todo, title: filmTitle }
            : todo
        )),
      originalTodos: [...prevState.originalTodos]
        .map(orTodo => (
          orTodo.id === todoId
            ? { ...orTodo, title: filmTitle }
            : orTodo
        )),
    }));
  }

  handleDeleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: [...prevState.todos]
        .filter(todo => (todo.id !== todoId)),
      originalTodos: [...prevState.originalTodos]
        . filter(todo => (todo.id !== todoId)),
    }));
  }

  handleTodoStatus = (todoId) => {
    this.setState(prevState => ({
      todos: [...prevState.todos]
        .map(todo => (
          todo.id === todoId
            ? { ...todo, completed: !todo.completed }
            : todo
        )),
      originalTodos: [...prevState.originalTodos]
        .map(orTodo => (
          orTodo.id === todoId
            ? { ...orTodo, completed: !orTodo.completed }
            : orTodo
        )),
    }));

    this.handleButtonChange(this.state.buttonSelected);
  }

  handleCompletedAll = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos]
        .map(todo => ({
          ...todo,
          completed: !prevState.todos.every(({ completed }) => completed),
        })),
      originalTodos: [...prevState.originalTodos]
        .map(orTodo => ({
          ...orTodo,
          completed: !prevState.originalTodos
            .every(({ completed }) => completed),
        })),
    }));

    this.handleButtonChange(this.state.buttonSelected);
  }

  handleButtonChange = (value) => {
    switch (value) {
      case 'all':
        this.setState(prevState => ({
          todos: [...prevState.originalTodos],
          buttonSelected: 'all',
        }));
        break;
      case 'active':
        this.setState(prevState => ({
          todos: [...prevState.originalTodos].filter(todo => !todo.completed),
          buttonSelected: 'active',
        }));
        break;
      case 'completed':
        this.setState(prevState => ({
          todos: [...prevState.originalTodos].filter(todo => todo.completed),
          buttonSelected: 'completed',
        }));
        break;
      default:
        break;
    }
  }

  handleDeleteAllCompleted = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(todo => !todo.completed),
      originalTodos: [...prevState.originalTodos]
        .filter(todo => !todo.completed),
    }));
  }

  render() {
    const {
      todos, originalTodos, buttonSelected,
    } = this.state;

    return (
      <section className="todoapp">
        <NewTodo addNewTodo={this.handleAddNewTodo} />

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.handleCompletedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todosList={todos}
            handleTodoStatus={this.handleTodoStatus}
            handleDeleteTodo={this.handleDeleteTodo}
            handleDoubleClickEditTitle={this.handleDoubleClickEditTitle}
          />
        </section>
        <TodosFilter
          handleButtonChange={this.handleButtonChange}
          originalTodos={originalTodos}
          todosList={todos}
          buttonSelected={buttonSelected}
          handleDeleteAllCompleted={this.handleDeleteAllCompleted}
        />
      </section>
    );
  }
}

export default App;
