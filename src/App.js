import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilters } from './components/TodosFilter';

const filterType = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

class App extends React.Component {
  state = {
    todos: [],
    selectAll: false,
    currentFilter: filterType.all,
  }

  addNewTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  };

  toggleComplete = (id) => {
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

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(todo => id !== todo.id),
    }));
  }

  toggleSelectAll = ({ target }) => {
    this.setState(({ todos, selectAll }) => {
      const allDone = todos.map(todo => ({
        ...todo,
        completed: target.checked,
      }));

      return {
        todos: allDone,
        selectAll: !selectAll,
      };
    });
  }

  activeTodoCounter = () => this.state.todos
    .filter(task => !task.completed).length

  filterSelector = (currentFilter) => {
    this.setState({ currentFilter });
  }

  filterByStatus = () => {
    if (this.state.currentFilter === filterType.active) {
      return this.state.todos.filter(todo => !todo.completed);
    }

    if (this.state.currentFilter === filterType.completed) {
      return this.state.todos.filter(todo => todo.completed);
    }

    return this.state.todos;
  }

  removeCompleted = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(todo => !todo.completed),
    }));
  }

  editTitleTodo = (title, id) => {
    if (!title.trim()) {
      return;
    }

    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    const filteredTodos = this.filterByStatus();

    return (
      <section className="todoapp">
        <TodoApp
          todos={this.state.todos}
          addNewTodo={this.addNewTodo}
        />
        <TodoList
          todos={filteredTodos}
          toggleComplete={this.toggleComplete}
          toggleSelectAll={this.toggleSelectAll}
          editTitleTodo={this.editTitleTodo}
          removeTodo={this.removeTodo}
        />
        {this.state.todos.length > 0 && (
          <TodosFilters
            filterType={filterType}
            todos={this.state.todos}
            currentFilter={this.state.currentFilter}
            activeTodoCounter={this.activeTodoCounter}
            filterSelector={this.filterSelector}
            removeCompleted={this.removeCompleted}
          />
        )}
      </section>
    );
  }
}

export default App;
