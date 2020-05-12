import React from 'react';
import TodoList from './TodoList';
import Header from './Header';
import Footer from './Footer';

const filterTypes = {
  active: 'Active',
  completed: 'Completed',
  all: 'All',
};

class App extends React.Component {
  state = {
    todos: [],
    filterType: filterTypes.all,
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('todoApp'));

    if (data) {
      this.setState({
        ...data,
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todoApp', JSON.stringify(this.state));
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  makeIdTodo = () => {
    const maxId = Math.max(...this.state.todos.map(todo => todo.id));
    const maxIdTodo = maxId !== -Infinity ? maxId : 1;

    return maxIdTodo;
  }

  saveChangesTodo = (todoId, todoTitle) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: todoTitle,
          };
        }

        return todo;
      }),
    }));
  }

  changesStatusTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  selectAllTodos = (completedStatusTodos) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !completedStatusTodos,
      })),
    }));
  }

  setFilter = (filterType) => {
    this.setState({
      filterType,
    });
  }

  getVisibleTodos = () => {
    const { todos, filterType } = this.state;

    if (filterType === filterTypes.active) {
      return todos.filter(todo => !todo.completed);
    }

    if (filterType === filterTypes.completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todos, filterType } = this.state;
    const todoId = this.makeIdTodo();
    const initialDisplay = (todos.length === 0);
    const completedStatusTodos = todos.length === 0
      ? false
      : todos.every(todo => todo.completed);

    const visibleClearCompleted = todos.some(todo => todo.completed);
    const incompleteTodosSum = todos.filter(todo => !todo.completed).length;
    const visibleTodos = this.getVisibleTodos(filterType);

    return (
      <section className="todoapp">
        <Header
          addTodo={this.addTodo}
          todoId={todoId}
        />

        <section className="main">
          {!initialDisplay && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                checked={completedStatusTodos}
                onChange={() => this.selectAllTodos(completedStatusTodos)}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )}
          <TodoList
            todos={visibleTodos}
            changesStatusTodo={this.changesStatusTodo}
            deleteTodo={this.deleteTodo}
            saveChangesTodo={this.saveChangesTodo}
          />
        </section>

        {
          !initialDisplay
          && (
            <Footer
              noComlpetedTodo={incompleteTodosSum}
              setFilter={this.setFilter}
              clearCompleted={this.clearCompleted}
              visibleClearCompleted={visibleClearCompleted}
              filterType={filterType}
            />
          )
        }

      </section>
    );
  }
}

export default App;
