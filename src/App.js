import React from 'react';
import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { FILTER_TYPES } from './constants';

class App extends React.Component {
  state = {
    todos: [],
    selectedTodos: FILTER_TYPES.all,
  };

  componentDidMount() {
    const todosFromStorage = localStorage.getItem('todos');

    if (todosFromStorage) {
      const todos = JSON.parse(todosFromStorage);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;

    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = (todo) => {
    const { todos } = this.state;

    this.setState(state => ({
      todos: [...todos, todo],
    }));
  }

  deleteTodo = (id) => {
    const { todos } = this.state;

    this.setState(() => ({
      todos: todos.filter(todo => todo.id !== id),
    }));
  }

  editTodo = (itemId, value) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }

        return {
          ...todo,
          title: value,
        };
      }),
    }));
  }

  changeStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  toggleAllTodoStatus = ({ target }) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => ({
        ...todo,
        completed: target.checked,
      })),
    }));
  }

  setFilter = (filter) => {
    this.setState({ selectedTodos: filter });
  }

  filterTodos = () => {
    const { selectedTodos, todos } = this.state;

    switch (selectedTodos) {
      case FILTER_TYPES.active:
        return todos.filter(todo => !todo.completed);
      case FILTER_TYPES.completed:
        return todos.filter(todo => todo.completed);
      case FILTER_TYPES.all:
        return todos.filter(todo => todo.id);
      default:
        return todos;
    }
  };

  handleClearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todos, selectedTodos } = this.state;
    const visibleTodos = this.filterTodos(selectedTodos);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoInput addTodo={this.addTodo} />
        </header>
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.toggleAllTodoStatus}
            checked={todos.every(todo => todo.completed)}
          />
          {todos.length > 0 && (
            <label
              htmlFor="toggle-all"
            >
              Mark all as complete
            </label>
          )}

          <TodoList
            todos={todos}
            visibleTodos={visibleTodos}
            deleteTodo={this.deleteTodo}
            changeStatus={this.changeStatus}
            onEditTodo={this.editTodo}
          />
        </section>
        <Footer
          todos={todos}
          setFilter={this.setFilter}
          selectedTodos={selectedTodos}
          onClearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}

export default App;
