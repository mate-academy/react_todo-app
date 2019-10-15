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

  componentDidMount() {
    this.setState({
      todos: JSON.parse(localStorage.getItem('todosList')) || [],
      originalTodos: JSON
        .parse(localStorage.getItem('originalTodosList')) || [],
    });

    this.handleButtonChange(this.state.buttonSelected);
  }

  componentDidUpdate(prevState) {
    const { todos, originalTodos } = this.state;

    if (todos !== prevState.todos) {
      localStorage.setItem('originalTodosList', JSON.stringify(originalTodos));
      localStorage.setItem('todosList', JSON.stringify(todos));
    }
  }

  handleAddNewTodo = (todo) => {
    if (todo.title) {
      this.setState(prevState => ({
        todos: [...prevState.todos, todo],
        originalTodos: [...prevState.originalTodos, todo],
      }));
    }

    this.handleButtonChange(this.state.buttonSelected);
  }

  handleDoubleClickEditTitle = (filmTitle, todoId) => {
    const mapFuncAddTitle = todo => (
      todo.id === todoId
        ? { ...todo, title: filmTitle }
        : todo
    );

    this.setState(prevState => ({
      todos: prevState.todos
        .map(mapFuncAddTitle),
      originalTodos: prevState.originalTodos
        .map(mapFuncAddTitle),
    }));
  }

  handleDeleteTodo = (todoId) => {
    const arrFilter = todo => (
      todo.id !== todoId
    );

    this.setState(prevState => ({
      todos: prevState.todos
        .filter(arrFilter),
      originalTodos: prevState.originalTodos
        .filter(arrFilter),
    }));
  }

  handleTodoStatus = (todoId) => {
    const mapFuncCompletedTodo = todo => (
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    this.setState(prevState => ({
      todos: prevState.todos
        .map(mapFuncCompletedTodo),
      originalTodos: prevState.originalTodos
        .map(mapFuncCompletedTodo),
    }));

    this.handleButtonChange(this.state.buttonSelected);
  }

  handleCompletedAll = () => {
    const filterFunc = arr => (
      arr.map(todo => ({
        ...todo,
        completed: !arr.every(({ completed }) => completed),
      }))
    );

    this.setState(prevState => ({
      todos: filterFunc(prevState.todos),
      originalTodos: filterFunc(prevState.originalTodos),
    }));

    this.handleButtonChange(this.state.buttonSelected);
  }

  handleButtonChange = (value) => {
    switch (value) {
      case 'active':
        this.setState(prevState => ({
          todos: prevState.originalTodos.filter(todo => !todo.completed),
          buttonSelected: 'active',
        }));
        break;
      case 'completed':
        this.setState(prevState => ({
          todos: prevState.originalTodos.filter(todo => todo.completed),
          buttonSelected: 'completed',
        }));
        break;
      case 'all':
      default:
        this.setState(prevState => ({
          todos: [...prevState.originalTodos],
          buttonSelected: 'all',
        }));
    }
  }

  handleDeleteAllCompleted = () => {
    const filterFunc = arr => (
      arr.filter(todo => !todo.completed)
    );

    this.setState(prevState => ({
      todos: filterFunc(prevState.todos),
      originalTodos: filterFunc(prevState.originalTodos),
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
