import React from 'react';
import TodoList from './TodoList';
import Footer from './Footer';
import Header from './Header';

const FILTER_TYPES = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

class App extends React.Component {
  state = {
    todos: [],
    counterId: 1,
    selectedFilter: FILTER_TYPES.all,
  }

  generateId = () => {
    const { counterId } = this.state;

    this.setState(state => ({
      counterId: state.counterId + 1,
    }));

    return counterId;
  }

  add = (title) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: this.generateId(),
        title,
        completed: false,
      }],
    }));
  }

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(item => !item.completed),
    }));
  }

  destroy = (itemId) => {
    this.setState(state => ({
      todos: state.todos.filter(item => item.id !== itemId),
    }));
  }

  checked = (id) => {
    this.setState(state => ({
      todos: state.todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return { ...item };
      }),
    }));
  };

  setFilter = (filter) => {
    this.setState({
      selectedFilter: filter,
    });
  }

  checkedAll = (checked) => {
    this.setState(state => ({
      todos: state.todos.map(item => ({
        ...item, completed: checked,
      })),

    }));
  }

  getFilterTodos = () => {
    const { todos, selectedFilter } = this.state;
    const { completed, active, all } = FILTER_TYPES;

    switch (selectedFilter) {
      case completed: return todos.filter(todo => todo.completed);
      case active: return todos.filter(todo => !todo.completed);
      case all:
      default: return todos;
    }
  }

  render() {
    return (
      <section className="todoapp">
        <form className="header" onSubmit={this.onSubmit}>
          <h1>todos</h1>
          <Header add={this.add} />
        </form>
        <TodoList
          todos={this.getFilterTodos()}
          destroy={this.destroy}
          checkedAll={this.checkedAll}
          checked={this.checked}
        />
        {this.state.todos.length !== 0
          && (
            <Footer
              todos={this.state.todos}
              FILTER_TYPES={FILTER_TYPES}
              clearCompleted={this.clearCompleted}
              stateComplitedFilter={this.stateComplitedFilter}
              selectedFilter={this.state.selectedFilter}
              setFilter={this.setFilter}
            />
          )}
      </section>
    );
  }
}
export default App;
