import React from 'react';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  state = {
    todos: [],
    filters: ['all', 'active', 'completed'],
    valueTitle: '',
    filterName: '',
    activeFilterIndex: 0,
  }

  selectAllHandler = () => {
    this.setState((state) => {
      const allSelected = state.todos.every(todo => todo.completed);

      return {
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allSelected,
        })),
      };
    });
  }

  InputChangeHandler = (event) => {
    this.setState({
      valueTitle: event.target.value,
    });
  };

  addTodoHandler = (event) => {
    event.preventDefault();
    if (this.state.valueTitle) {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            id: +Date.now(),
            title: state.valueTitle,
            completed: state.isCompleted,
          },
        ],
        valueTitle: '',
      }));
    }
  }

  toggleHandler = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  };

  removeHandler = (todoId) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== todoId),
    }));
  };

  clearCompletedHandler = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  }

  getFilterTodo = (currentFilter) => {
    const { todos } = this.state;

    switch (currentFilter) {
      case 'completed': return todos.filter(todo => todo.completed);
      case 'active': return todos.filter(todo => !todo.completed);
      case 'all': return todos;
      default: return todos;
    }
  }

  filterHandler = (filter, i) => {
    this.setState({
      filterName: filter,
      activeFilterIndex: i,
    });
  }

  render() {
    const { todos,
      valueTitle,
      filterName,
      filters,
      activeFilterIndex } = this.state;
    const visibleTodos = this.getFilterTodo(filterName);

    return (
      <section className="todoapp">
        <NewTodo
          todos={todos}
          valueTitle={valueTitle}
          InputChangeHandler={this.InputChangeHandler}
          addTodoHandler={this.addTodoHandler}
        />
        <TodoList
          todos={todos}
          visibleTodos={visibleTodos}
          selectAllHandler={this.selectAllHandler}
          removeHandler={this.removeHandler}
          toggleHandler={this.toggleHandler}
        />
        <Footer
          todos={todos}
          clearCompletedHandler={this.clearCompletedHandler}
          filterHandler={this.filterHandler}
          filters={filters}
          activeFilterIndex={activeFilterIndex}
        />
      </section>
    );
  }
}

export default App;
