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
  // componentDidMount() {

  // }
  handleAddNewTodo = (todo) => {
    if (todo.title.length > 0) {
      this.setState(prevState => ({
        todos: [...prevState.todos, todo],
        originalTodos: [...prevState.originalTodos, todo],
      }));
    }

    if (this.state.buttonSelected === 'all') {
      this.handleShowAllTodos();
    }

    if (this.state.buttonSelected === 'active') {
      this.handleActiveTodos();
    }

    if (this.state.buttonSelected === 'completed') {
      this.handleCompletedTodos();
    }
  }

  handleDoubleClickEditTitle = ({ target }, todoId) => {
    this.setState(prevState => ({
      todos: [...prevState.todos]
        .map(todo => (
          todo.id === todoId
            ? { ...todo, title: target.value }
            : todo
        )),
      originalTodos: [...prevState.originalTodos]
        .map(orTodo => (
          orTodo.id === todoId
            ? { ...orTodo, title: target.value }
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
  }

  handleCompletedAll = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos]
        .map(todo => ({ ...todo, completed: !todo.completed })),
      originalTodos: [...prevState.originalTodos]
        .map(orTodo => ({ ...orTodo, completed: !orTodo.completed })),
    }));
  }

  handleShowAllTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos],
      buttonSelected: 'all',
    }));
  }

  handleActiveTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos].filter(todo => !todo.completed),
      buttonSelected: 'active',
    }));
  }

  handleCompletedTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos].filter(todo => todo.completed),
      buttonSelected: 'completed',
    }));
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
          onButtonAllChange={this.handleShowAllTodos}
          onButtonCompletedChange={this.handleCompletedTodos}
          onButtonActiveChange={this.handleActiveTodos}
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
