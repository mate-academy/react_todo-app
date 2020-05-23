import React from 'react';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';
import NewTodo from './NewTodo';

const filterTypes = ['All', 'Active', 'Completed'];

class App extends React.Component {
  state = {
    todos: [],
    filter: 'All',
  }

  addTodo = (todo) => {
    const { todos } = this.state;

    this.setState(() => {
      const allTodos = [...todos, todo];

      return {
        todos: allTodos,
      };
    });
  }

  changeComplete = (id) => {
    this.setState((prevState) => {
      const allTodos = prevState.todos.map(todo => (
        todo.id === id
          ? {
            ...todo, completed: !todo.completed,
          }
          : todo
      ));

      return {
        todos: allTodos,
      };
    });
  }

  filterItem = (filter) => {
    this.setState(() => ({
      filter,
    }));
  }

  deleteTodo = (todoId) => {
    this.setState((prevState) => {
      const allTodos = prevState.todos.filter(todo => todo.id !== todoId);

      return {
        todos: allTodos,
      };
    });
  }

  clearCompleted = () => {
    this.setState((prevState) => {
      const allTodos = prevState.todos.filter(todo => !todo.completed);

      return {
        todos: allTodos,
      };
    });
  }

  pickAll = ({ target }) => {
    const { checked } = target;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: checked,
      })),
    }));
  }

  render() {
    const { todos, filter } = this.state;
    const activeTodos = todos.filter(todo => !todo.completed);
    const completeTodos = todos.filter(todo => todo.completed);

    let filterTodos = [...todos];

    if (filter === 'Active') {
      filterTodos = activeTodos;
    }

    if (filter === 'Completed') {
      filterTodos = completeTodos;
    }

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
            onClick={this.pickAll}
          />
          {todos.length > 0 && (
            <label htmlFor="toggle-all">Mark all as complete</label>
          )}
          <TodoList
            todos={filterTodos}
            changeComplete={this.changeComplete}
            deleteTodo={this.deleteTodo}
          />
        </section>
        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {`${activeTodos.length} items left`}
            </span>
            <TodosFilter
              filterItem={this.filterItem}
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
        )
        }

      </section>
    );
  }
}

export default App;
