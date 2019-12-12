import React, { Component } from 'react';
import TodoList from './components/TodoList';
import TodosFilter from './components/TodosFilters';

const FILTERS = [
  'All',
  'Active',
  'Completed',
];

class App extends Component {
  state = {
    todos: [],
    title: '',
    selectedFilter: FILTERS[0],
  }

  setTitle = (event) => {
    const title = event.target.value
      .replace(/[^A-Za-zА-Яа-яі0-9\s]/, '')
      .slice(0, 37);

    this.setState({
      title,
    });
  }

  addTodo = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (prevState.title.trim() === '') {
        return '';
      }

      return {
        todos: [...prevState.todos, {
          id: +new Date(),
          title: prevState.title,
          completed: false,
        }],
        title: '',
        selectedFilter: FILTERS[0],
      };
    });
  };

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  clearAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  toggleTodoCompleted = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
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

  toggleAllComplete = () => {
    this.setState((prevState) => {
      if (prevState.todos.every(todo => todo.completed)) {
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
  };

  setFilter = (filter) => {
    this.setState({
      selectedFilter: filter,
    });
  };

  filterTodos = () => {
    switch (this.state.selectedFilter) {
      case FILTERS[1]:
        return this.state.todos.filter(todo => !todo.completed);
      case FILTERS[2]:
        return this.state.todos.filter(todo => todo.completed);
      default:
        return this.state.todos.filter(todo => todo.id);
    }
  }

  render = () => {
    const { todos, title, selectedFilter } = this.state;
    const completedTodos = todos.filter(todo => !todo.completed).length;
    const visibleTodos = this.filterTodos();
    const isAllCompleted = todos.every(todo => todo.completed);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.addTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              type="text"
              onChange={this.setTitle}
              value={title}
            />
          </form>

        </header>

        {todos.length === 0 || (
          <>
            <section className="main">
              <label
                className={isAllCompleted ? 'label-checked-all' : 'label'}
                htmlFor="toggle-all"
              >
                <input
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                  onChange={this.toggleAllComplete}
                  checked={isAllCompleted}
                />
                Mark all as complete
              </label>

              <TodoList
                items={visibleTodos}
                onTodoToggled={this.toggleTodoCompleted}
                onTodoDeleted={this.deleteTodo}
              />
            </section>

            <footer className="footer">
              <span className="todo-count">
                {`${completedTodos} items left`}
              </span>

              <TodosFilter
                filters={FILTERS}
                onFiltered={this.setFilter}
                selectedFilter={selectedFilter}
              />

              {todos.some(todo => todo.completed) && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={this.clearAllCompleted}
                >
                  Clear completed
                </button>
              )}

            </footer>
          </>
        )}

      </section>
    );
  };
}

export default App;
