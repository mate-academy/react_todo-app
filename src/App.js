import React from 'react';
import TodoList from './TodoList';
import NewTodo from './NewTodo';
import Footer from './Footer';

const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

class TodoApp extends React.Component {
  state = {
    todos: [],
    filter: FILTERS.all,
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
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => todo.id !== id),
      }));
    }
  }

  selectAllTodo = ({ target }) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: target.checked,
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

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  filterTodoList = () => {
    const { filter, todos } = this.state;

    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  render() {
    const {
      todos,
      filter,
    } = this.state;

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
          todos={this.filterTodoList()}
          initialTodos={todos}
          changeStatus={this.changeStatus}
          deleteTodo={this.deleteTodo}
          selectAllTodo={this.selectAllTodo}
          changeTitle={this.changeTitle}
        />
        <Footer
          todos={todos}
          filter={filter}
          todosFilter={this.todosFilter}
          clearCompleted={this.clearCompleted}
          FILTERS={FILTERS}
        />
      </section>

    );
  }
}

export default TodoApp;
