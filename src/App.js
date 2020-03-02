import React from 'react';

import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import {
  TodosFilter, filterButtons,
} from './components/TodosFilter/TodosFilter';

class App extends React.Component {
  state = {
    visibleTodos: [],
    filterButtonsChosed: filterButtons.all,
  };

  componentDidMount() {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      const visibleTodos = JSON.parse(storedTodos);

      this.setState({ visibleTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.visibleTodos !== this.state.visibleTodos) {
      localStorage.setItem('todos', JSON.stringify(this.state.visibleTodos));
    }
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      visibleTodos: [...prevState.visibleTodos, todo],
    }));
  };

  checkedTodo = (id) => {
    this.setState(prevState => ({
      visibleTodos: prevState.visibleTodos
        .map((todo) => {
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

  deleteTodo = (id) => {
    this.setState(prevState => ({

      visibleTodos: prevState.visibleTodos
        .filter(todo => todo.id !== id),
    }));
  };

  filterHandler = (filterButton) => {
    this.setState({
      filterButtonsChosed: filterButton,
    });
  }

  filterTodos = () => {
    const { filterButtonsChosed, visibleTodos } = this.state;

    switch (filterButtonsChosed) {
      case filterButtons.active:
        return visibleTodos.filter(todo => !todo.completed);
      case filterButtons.completed:
        return visibleTodos.filter(todo => todo.completed);
      case filterButtons.all:
        return [...visibleTodos];
      default:
        return [...visibleTodos];
    }
  }

  toggleAll = () => {
    const { visibleTodos } = this.state;

    this.setState((prevState) => {
      if (visibleTodos.every(todo => todo.completed)) {
        return {
          visibleTodos: prevState.visibleTodos.map(todo => ({
            ...todo,
            completed: false,
          })),
        };
      }

      return {
        visibleTodos: prevState.visibleTodos.map(todo => ({
          ...todo,
          completed: true,
        })),
      };
    });
  }

  clearAllCompleted = () => {
    this.setState(prevState => ({
      visibleTodos: prevState.visibleTodos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { filterButtonsChosed } = this.state;
    const filteredTodos = this.filterTodos();

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />

        </header>

        <section className="main">
          <TodoList
            visibleTodos={filteredTodos}
            deleteTodo={this.deleteTodo}
            checkedTodo={this.checkedTodo}
          />
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </section>
        <TodosFilter
          filterButtonsChosed={filterButtonsChosed}
          todos={this.state.visibleTodos}
          filterHandler={this.filterHandler}
          onFilters={this.filteredTodos}
          onClearCompleted={this.clearAllCompleted}
        />
      </section>
    );
  }
}

export default App;
