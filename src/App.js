import React from 'react';
import TodoList from './components/TodoList';
import TodosFilter from './components/TodosFilter';
import NewTodo from './components/NewTodo';

const filterTypes = ['All', 'Active', 'Completed'];

const filterTodos = (todos, filter) => {
  if (filter === 'Active') {
    return todos.filter(todo => !todo.completed);
  }

  if (filter === 'Completed') {
    return todos.filter(todo => todo.completed === true);
  }

  return todos;
};

class App extends React.Component {
  state = {
    todos: [],
    visibleTodos: [],
    filter: 'All',
  }

  addTodo = (todo) => {
    const { filter, todos } = this.state;

    this.setState(() => {
      const allTodos = [...todos, todo];

      return {
        todos: allTodos,
        visibleTodos: filterTodos(allTodos, filter),
      };
    });
  }

  toggledCheck = (id, checked) => {
    const { filter } = this.state;

    this.setState((prevState) => {
      const allTodos = prevState.todos.map(todo => (
        todo.id === id
          ? {
            ...todo,
            completed: checked,
          }
          : todo
      ));

      return {
        todos: allTodos,
        visibleTodos: filterTodos(allTodos, filter),
      };
    });
  }

  filteredItems = (filter) => {
    const { todos } = this.state;

    this.setState(() => {
      const allTodos = [...todos];

      return {
        visibleTodos: filterTodos(allTodos, filter),
        filter,
      };
    });
  }

  deleteTask = (id) => {
    const { filter } = this.state;

    this.setState((prevState) => {
      const allTodos = prevState.todos.filter(todo => todo.id !== id);

      return {
        todos: allTodos,
        visibleTodos: filterTodos(allTodos, filter),
      };
    });
  }

  clearCompleted = () => {
    const { filter } = this.state;

    this.setState((prevState) => {
      const allTodos = prevState.todos.filter(todo => !todo.completed);

      return {
        todos: allTodos,
        visibleTodos: filterTodos(allTodos, filter),
      };
    });
  }

  checkedAll = ({ target }) => {
    const { checked } = target;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: checked,
      })),
      visibleTodos: prevState.todos.map(todo => ({
        ...todo,
        completed: checked,
      })),
    }));
  }

  render() {
    const { todos, visibleTodos, filter } = this.state;
    const activeTodos = todos.filter(todo => !todo.completed);

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
            checked={todos.length && todos.every(todo => todo.completed)}
            onClick={this.checkedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={visibleTodos}
            toggledCheck={this.toggledCheck}
            deleteTask={this.deleteTask}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {`${activeTodos.length} items left`}
          </span>
          <TodosFilter
            filtered={this.filteredItems}
            filterTypes={filterTypes}
            filter={filter}
          />
          <button
            type="button"
            className="clear-completed"
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
