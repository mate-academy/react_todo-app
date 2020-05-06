import React from 'react';
import classNames from 'classnames';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

const test = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
];

class TodoApp extends React.Component {
  state = {
    todos: test,
    filter: 'all',
    onButtonAllSelect: false,
    onButtonActiveSelect: false,
    onButtonCompletedSelect: false,
    onSelectAllTodos: true,
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

  filterViewAll = () => {
    this.setState({
      filter: 'all',
      onButtonAllSelect: true,
      onButtonActiveSelect: false,
      onButtonCompletedSelect: false,
    });
  }

  filterActive = () => {
    this.setState({
      filter: 'active',
      onButtonAllSelect: false,
      onButtonActiveSelect: true,
      onButtonCompletedSelect: false,
    });
  }

  filterCompleted = () => {
    this.setState({
      filter: 'completed',
      onButtonAllSelect: false,
      onButtonActiveSelect: false,
      onButtonCompletedSelect: true,
    });
  }

  render() {
    const {
      todos,
      filter,
      onButtonAllSelect,
      onButtonActiveSelect,
      onButtonCompletedSelect,
    } = this.state;

    const notComplitedTodo = todos.filter(todo => todo.completed === false);
    let preparedTodos;

    if (filter === 'all') {
      preparedTodos = [...todos];
    }

    if (filter === 'active') {
      preparedTodos = [...todos].filter(todo => todo.completed === false);
    }

    if (filter === 'completed') {
      preparedTodos = [...todos].filter(todo => todo.completed === true);
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
          changeStatus={this.changeStatus}
          deleteTodo={this.deleteTodo}
          selectAllTodo={this.selectAllTodo}
        />

        <footer
          className={classNames('footer', { activeClear: todos.length === 0 })}
        >
          <span className="todo-count">
            {notComplitedTodo.length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({ selected: onButtonAllSelect })}
                onClick={this.filterViewAll}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/active"
                onClick={this.filterActive}
                className={classNames({ selected: onButtonActiveSelect })}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/completed"
                onClick={this.filterCompleted}
                className={classNames({ selected: onButtonCompletedSelect })}
              >
                Completed
              </a>
            </li>
          </ul>

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
