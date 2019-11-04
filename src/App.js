import React from 'react';
import TodoFilter from './components/todosFilter/TodosFilter';
import TodoList from './components/todoList/TodoList';
import TodoApp from './components/todoApp/TodoApp';

class App extends React.Component {
  state = {
    todos: [],
    originTodos: [],
    indexTab: 'all',
  };

  componentDidMount() {
    this.setState({
      todos: JSON.parse(localStorage.getItem('todoLost')) || [],
      originTodos: JSON.parse(localStorage.getItem('originTodoList')) || [],
    });

    this.allTodosClick(this.state.indexTab);
  }

  componentDidUpdate(prevState) {
    const { todos, originTodos } = this.state;

    if (todos !== prevState.todos) {
      localStorage.setItem('originTodoList', JSON.stringify(originTodos));
      localStorage.setItem('todoList', JSON.stringify(todos));
    }
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos, todo],
      originTodos: [...prevState.originTodos, todo],
    }));
  };

  activeClick = () => {
    this.setState(prevState => ({
      todos: prevState.originTodos.filter(todo => !todo.completed),
      indexTab: 'active',
    }));
  };

  completedClick = () => {
    this.setState(prevState => ({
      todos: prevState.originTodos.filter(todo => todo.completed),
      indexTab: 'completed',
    }));
  };

  allTodosClick = () => {
    this.setState(prevState => ({
      todos: [...prevState.originTodos],
      indexTab: 'all',
    }));
  };

  handleStatusClick = (id) => {
    const statusTodo = todo => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    this.setState(prevState => ({
      todos: prevState.todos.map(statusTodo),
      originTodos: prevState.originTodos.map(statusTodo),
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
      originTodos: prevState.originTodos.map(findTodo),
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== id),
      originTodos: prevState.originTodos.filter(item => item.id !== id),
    }));
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      originTodos: prevState.originTodos.filter(todo => !todo.completed),
    }));
  };

  allCompleted = () => {
    const completeAll = markAll => (
      markAll.map(todo => ({
        ...todo,
        completed: !markAll.every(({ completed }) => completed),
      }))
    );

    this.setState(prevState => ({
      todos: completeAll(prevState.todos),
      originTodos: completeAll(prevState.originTodos),
    }));
  };

  render() {
    const { todos, originTodos, indexTab } = this.state;

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
            deleteTodo={this.deleteTodo}
            handleEdit={this.handleEdit}
          />
        </section>
        <TodoFilter
          todos={todos}
          originTodos={originTodos}
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
