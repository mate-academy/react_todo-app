import React from 'react';
import TodoApp from './components/TodoApp/TodoApp';
import TodoList from './components/TodoList/TodoList';
import TodosFilter from './components/TodosFilter/TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    toggleAll: false,
    filterName: 'All',
    isVisible: false,
  };

  addTodo = (newTodo) => {
    this.setState(({ todos }) => ({
      todos: [...todos, newTodo],
      toggleAll: false,
    }));
  };

  changeCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.map(el => (el.id === id
        ? {
          ...el, completed: !el.completed,
        }
        : el)),
      toggleAll: false,
    }), () => this.check());
  };

  changeAllCompleted = () => {
    if (this.state.todos.every(el => el.completed === false)) {
      this.setState(state => ({
        todos: state.todos.map(el => ({
          ...el,
          completed: !el.completed,
        })),
        toggleAll: true,
      }), () => this.check());

      return;
    }

    if (this.state.todos.every(el => el.completed === true)) {
      this.setState(state => ({
        todos: state.todos.map(el => ({
          ...el,
          completed: !el.completed,
        })),
        toggleAll: false,
      }), () => this.check());

      return;
    }

    this.setState(state => ({
      todos: state.todos.map(el => ({
        ...el,
        completed: true,
      })),
      toggleAll: true,
    }));
  };

  handleFilter = (filterName) => {
    this.setState({
      filterName,
    });
  };

  remove = (id) => {
    const { todos } = this.state;
    const newArray = todos.filter(el => el.id !== id);

    this.setState({
      todos: newArray,
    });
  };

  handleClear = () => {
    const { todos } = this.state;
    const newArray = todos.filter(el => !el.completed);

    this.setState({
      todos: newArray,
      isVisible: false,
    });
  };

  check = () => {
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
          toggleAll={this.state.toggleAll}
          changeAllCompleted={this.changeAllCompleted}
          remove={this.remove}
        />

        <TodosFilter
          todos={this.state.todos}
          handleFilter={this.handleFilter}
          clear={this.handleClear}
          isVisible={this.state.isVisible}
        />
      </section>
    );
  }
}

export default App;
