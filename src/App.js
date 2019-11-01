import React from 'react';
import TodoFilter from './components/todosFilter/TodosFilter';
import TodoList from './components/todoList/TodoList';
import TodoApp from './components/todoApp/TodoApp';

class App extends React.Component {
  state = {
    todos: [],
    initTodos: [],
    indexTab: '',
  };

  componentDidMount() {
    this.setState({
      todos: JSON.parse(localStorage.getItem('todoLost')) || [],
      initTodos: JSON.parse(localStorage.getItem('initTodoList')) || [],
    });

    this.allTodosClick(this.state.indexTab);
  }

  componentDidUpdate(prevState) {
    const { todos, initTodos } = this.state;

    if (todos !== prevState.todos) {
      localStorage.setItem('initTodoList', JSON.stringify(initTodos));
      localStorage.setItem('todoList', JSON.stringify(todos));
    }
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos, todo],
      initTodos: [...prevState.initTodos, todo],
    }));
  };

  activeClick = () => {
    this.setState(prevState => ({
      todos: prevState.initTodos.filter(todo => !todo.completed),
      indexTab: 'active',
    }));

    this.handleStatusClick(this.state.indexTab);
  };

  completedClick = () => {
    this.setState(prevState => ({
      todos: prevState.initTodos.filter(todo => todo.completed),
      indexTab: 'completed',
    }));
  };

  allTodosClick = () => {
    this.setState(prevState => ({
      todos: [...prevState.initTodos],
      indexTab: false,
    }));
  };

  handleStatusClick = (id) => {
    const statusTodo = todo => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    this.setState(prevState => ({
      todos: prevState.todos.map(statusTodo),
      initTodos: prevState.initTodos.map(statusTodo),
    }));

    if (this.state.indexTab === 'active') {
      this.activeClick();
    }

    if (this.state.indexTab === 'completed') {
      this.completedClick();
    }
  };

  handleEdit = (todo, id) => {
    const findTodo = item => (
      item.id === id
        ? { ...item, title: todo }
        : item
    );

    this.setState(prevState => ({
      todos: prevState.todos.map(findTodo),
      initTodos: prevState.initTodos.map(findTodo),
    }));
  };

  deleteClick = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== id),
      initTodos: prevState.initTodos.filter(item => item.id !== id),
    }));
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      initTodos: prevState.initTodos.filter(todo => !todo.completed),
    }));
  };

  allCompleted = () => {
    const completeAll = arr => (
      arr.map(todo => ({
        ...todo,
        completed: !arr.every(({ completed }) => completed),
      }))
    );

    this.setState(prevState => ({
      todos: completeAll(prevState.todos),
      initTodos: completeAll(prevState.initTodos),
    }));
  };

  render() {
    const { todos, initTodos, indexTab } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <TodoApp addTodo={this.addTodo} />
        </header>
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.allCompleted}
          />
          <label htmlFor="toggle-all">
            <input
              type="checkbox"
              className="toggle-all"
              onClick={this.allCompleted}
            />
            Mark all as complete
          </label>

          <TodoList
            todos={todos}
            handleStatusClick={this.handleStatusClick}
            deleteClick={this.deleteClick}
            handleEdit={this.handleEdit}
          />
        </section>
        <TodoFilter
          todos={todos}
          initTodos={initTodos}
          handleStatusClick={this.handleStatusClick}
          allTodosClick={this.allTodosClick}
          indexTab={indexTab}
          clearCompleted={this.clearCompleted}
          completedClick={this.completedClick}
          activeClick={this.activeClick}
        />
      </section>
    );
  }
}

export default App;
