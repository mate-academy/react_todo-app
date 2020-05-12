import React from 'react';
import classNames from 'classnames';
import TodoList from './TodoList';
import NewTodo from './NewTodo';
import FilterButtons from './FilterButtons';

const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

class TodoApp extends React.Component {
  state = {
    todos: [],
    filter: 'all',
    onSelectAllTodos: true,
  }

  componentDidMount() {
    const initialState = JSON.parse(localStorage.getItem('TODOs'));

    this.setState({
      ...initialState,
    });
  }

  componentDidUpdate() {
    localStorage.setItem('TODOs', JSON.stringify(this.state));
  }

  addTodo = (newTodo) => {
    this.setState(prevState => ({ todos: [...prevState.todos, newTodo] }));
  }

  changeStatus = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
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

  changeTitle = (id, newTitle) => {
    if (newTitle.trim() !== '') {
      this.setState(prevState => ({
        todos: prevState.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title: newTitle,
            };
          }

          return todo;
        }),
      }));
    } else {
      const removeTodoId = this.state.todos
        .findIndex(todo => todo.id === id);

      this.setState((prevState) => {
        const remainingTodos = [...prevState.todos];

        remainingTodos.splice(removeTodoId, 1);

        return (
          { todos: [...remainingTodos] }
        );
      });
    }
  }

  selectAllTodo = () => {
    this.setState(prevState => ({
      onSelectAllTodos: !prevState.onSelectAllTodos,
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.onSelectAllTodos,
      })),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.completed === false),
    }));
  }

  todosFilter = (event) => {
    this.setState({
      filter: event.target.id,
    });
  }

  deleteTodo = (event) => {
    const removeTodoId = this.state.todos
      .findIndex(item => item.id === +event.target.id);

    this.setState((prevState) => {
      const remainingTodos = [...prevState.todos];

      remainingTodos.splice(removeTodoId, 1);

      return (
        { todos: [...remainingTodos] }
      );
    });
  }

  render() {
    const {
      todos,
      filter,
    } = this.state;

    const notComplitedTodo = todos.filter(todo => todo.completed === false);
    const { all, completed, active } = FILTERS;

    let preparedTodos;

    if (filter === all) {
      preparedTodos = [...todos];
    }

    if (filter === active) {
      preparedTodos = [...todos].filter(todo => !todo.completed);
    }

    if (filter === completed) {
      preparedTodos = [...todos].filter(todo => todo.completed);
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <NewTodo
          addTodo={this.addTodo}
          length={todos.length}
        />
        <TodoList
          todos={preparedTodos}
          initialTodos={todos}
          changeStatus={this.changeStatus}
          deleteTodo={this.deleteTodo}
          selectAllTodo={this.selectAllTodo}
          changeTitle={this.changeTitle}
        />

        <footer
          className={classNames('footer', { activeClear: todos.length === 0 })}
        >
          <span className="todo-count">
            {notComplitedTodo.length}
            {' '}
            items left
          </span>

          <FilterButtons todosFilter={this.todosFilter} filter={filter} />

          <button
            type="button"
            className={classNames('clear-completed',
              { activeClear: todos.length === notComplitedTodo.length })}
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>

        </footer>
      </section>

    );
  }
}

export default TodoApp;
