import React from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';

const FILTER_TYPES = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

class App extends React.Component {
  state = {
    todos: [],
    filter: 'All',
    isChecked: false,
  }

  checkboxChange = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (id === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
            isChecked: false,
          };
        }

        return todo;
      }),
    }));
  }

  addTodo = (newitem) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newitem],
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => id !== todo.id),
    }));
  }

  togleCompleted = () => {
    if (this.state.todos.some(todo => !todo.completed)) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
        isChecked: true,
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
        isChecked: false,
      }));
    }
  }

  togleAll = () => {
    if (!this.state.todos.some(todo => !todo.completed)) {
      this.setState({
        isChecked: true,
      });
    } else {
      this.setState({
        isChecked: false,
      });
    }
  }

  filterHandler = (paramtr) => {
    this.setState({
      filter: paramtr,
    });
  }

  todosFilter = (item) => {
    if (this.state.filter === FILTER_TYPES.active) {
      return !item.completed;
    }

    if (this.state.filter === FILTER_TYPES.completed) {
      return item.completed;
    }

    return item;
  }

  removeCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <Header
          addTodo={this.addTodo}
          togleAll={this.togleAll}
        />
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={this.state.isChecked}
            onClick={this.togleCompleted}
          />
          <label
            htmlFor="toggle-all"
            style={{ display: this.state.todos.length ? '' : 'none' }}
          >
            Mark all as complete
          </label>
          <ul className="todo-list">
            <TodoList
              todos={this.state.todos.filter(this.todosFilter)}
              checkboxChange={this.checkboxChange}
              deleteTodo={this.deleteTodo}
              togleAll={this.togleAll}
              fixInput={this.fixInput}
            />
          </ul>
        </section>
        <Footer
          todos={this.state.todos}
          FILTER_TYPES={FILTER_TYPES}
          filter={this.state.filter}
          filterHandler={this.filterHandler}
          removeCompleted={this.removeCompleted}
        />
      </section>
    );
  }
}

export default App;
