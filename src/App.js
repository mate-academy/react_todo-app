import React from 'react';
import TodoApp from './components/TodoApp/TodoApp';
import TodoList from './components/TodoList/TodoList';
import TodosFilter from './components/TodosFilter/TodosFilter';

const LOCALSTORAGE_STATE = 'initialState';

class App extends React.Component {
  state = {
    todos: [],
    isToggledAll: false,
    filterName: 'All',
    isVisible: false,
  };

  componentDidMount() {
    const initialState = localStorage.getItem(LOCALSTORAGE_STATE);
    const parsedState = initialState && JSON.parse(initialState);

    if (parsedState) {
      this.setState({
        ...parsedState,
      });
    }
  }

  componentDidUpdate() {
    const stringifiedState = JSON.stringify(this.state);

    localStorage.setItem(LOCALSTORAGE_STATE, stringifiedState);
  }

  addTodo = (newTodo) => {
    this.setState(({ todos }) => ({
      todos: [...todos, newTodo],
      isToggledAll: false,
    }));
  };

  changeCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.map(el => (el.id === id
        ? {
          ...el,
          completed: !el.completed,
        }
        : el)),
      isToggledAll: false,
    }), () => this.checkAnythingCompleted());
  };

  changeAllCompleted = () => {
    if (this.state.todos.every(el => el.completed === false)) {
      this.setState(state => ({
        todos: state.todos.map(el => ({
          ...el,
          completed: !el.completed,
        })),
        isToggledAll: true,
      }), () => this.checkAnythingCompleted());

      return;
    }

    if (this.state.todos.every(el => el.completed === true)) {
      this.setState(state => ({
        todos: state.todos.map(el => ({
          ...el,
          completed: !el.completed,
        })),
        isToggledAll: false,
      }), () => this.checkAnythingCompleted());

      return;
    }

    this.setState(state => ({
      todos: state.todos.map(el => ({
        ...el,
        completed: true,
      })),
      isToggledAll: true,
    }));
  };

  handleFilter = (filterName) => {
    this.setState({
      filterName,
    });
  };

  removeTodo = (id) => {
    const { todos } = this.state;
    const newArray = todos.filter(el => el.id !== id);

    this.setState({
      todos: newArray,
    });
  };

  handleClearCompleted = () => {
    const { todos } = this.state;
    const newArray = todos.filter(el => !el.completed);

    this.setState({
      todos: newArray,
      isVisible: false,
    });
  };

  checkAnythingCompleted = () => {
    const { todos } = this.state;
    const isAnyElementCompleted = todos.some(el => el.completed);

    this.setState({
      isVisible: isAnyElementCompleted,
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoApp addTodo={this.addTodo} />
        </header>

        <TodoList
          items={this.state.todos}
          filter={this.state.filterName}
          changeCompleted={this.changeCompleted}
          isToggledAll={this.state.isToggledAll}
          changeAllCompleted={this.changeAllCompleted}
          removeTodo={this.removeTodo}
        />

        <TodosFilter
          todos={this.state.todos}
          handleFilter={this.handleFilter}
          handleClearCompleted={this.handleClearCompleted}
          isVisible={this.state.isVisible}
        />
      </section>
    );
  }
}

export default App;
