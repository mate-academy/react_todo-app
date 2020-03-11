import React from 'react';

import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import {
  TodosFilter, filterButtons,
} from './components/TodosFilter/TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    filterButtonsChosed: filterButtons.all,
  };

  componentDidMount() {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      const todos = JSON.parse(storedTodos);

      this.setState({ todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({

      todos: prevState.todos
        .filter(todo => todo.id !== id),
    }));
  };

  filterHandler = (filterButton) => {
    this.setState({
      filterButtonsChosed: filterButton,
    });
  }

  filterTodos = () => {
    const { filterButtonsChosed, todos } = this.state;

    switch (filterButtonsChosed) {
      case filterButtons.active:
        return todos.filter(todo => !todo.completed);
      case filterButtons.completed:
        return todos.filter(todo => todo.completed);
      case filterButtons.all:
        return [...todos];
      default:
        return [...todos];
    }
  }

  checkedTodo = (id, checked) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: checked,
            };
          }

          return todo;
        }),
    }));
  }

  toggleAll = () => {
    const { todos } = this.state;

    this.setState((prevState) => {
      if (todos.every(todo => todo.completed)) {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: false,
          })),
        };
      }

      return {
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      };
    });
  }

  clearAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todos, filterButtonsChosed } = this.state;
    const filteredTodos = this.filterTodos();
    const checkComplete = todos.every(todo => todo.completed);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />

        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.toggleAll}
            checked={checkComplete}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={filteredTodos}
            deleteTodo={this.deleteTodo}
            checkedTodo={this.checkedTodo}
          />
        </section>
        <TodosFilter
          filterButtonsChosed={filterButtonsChosed}
          todos={this.state.todos}
          filterHandler={this.filterHandler}
          onClearCompleted={this.clearAllCompleted}
        />
      </section>
    );
  }
}

export default App;
