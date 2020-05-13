import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';

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
    }), () => {
      this.checkAnythingCompleted();
      this.checkAllCompleted();
    });
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

  checkAllCompleted = () => {
    const { todos } = this.state;
    const areAllElementCompleted = todos.every(el => el.completed);

    this.setState({
      isToggledAll: areAllElementCompleted,
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />

        <TodoList
          items={this.state.todos}
          filter={this.state.filterName}
          changeCompleted={this.changeCompleted}
          isToggledAll={this.state.isToggledAll}
          changeAllCompleted={this.changeAllCompleted}
          removeTodo={this.removeTodo}
        />

        <Footer
          todos={this.state.todos}
          handleFilter={this.handleFilter}
          handleClearCompleted={this.handleClearCompleted}
          isVisible={this.state.isVisible}
          filterName={this.state.filterName}
        />
      </section>
    );
  }
}

export default App;
